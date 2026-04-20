import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRoles } from "@/lib/scraper/verify";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const start = Date.now();

    // Verify active roles older than 1 day, oldest-verified first
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const rolesToVerify = await prisma.role.findMany({
      where: {
        status: "active",
        firstSeen: { lt: oneDayAgo },
      },
      select: { id: true, url: true },
      orderBy: { lastVerified: "asc" },
      take: 100, // Cap at 100 per run to stay under 60s
    });

    let rolesClosed = 0;
    if (rolesToVerify.length > 0) {
      const verificationResults = await verifyRoles(rolesToVerify);
      for (const [id, status] of verificationResults) {
        if (status === "closed") {
          await prisma.role.update({
            where: { id },
            data: { status: "closed" },
          });
          rolesClosed++;
        } else {
          await prisma.role.update({
            where: { id },
            data: { lastVerified: new Date() },
          });
        }
      }
    }

    // Mark roles not verified in 30+ days as stale
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const staleResult = await prisma.role.updateMany({
      where: {
        status: "active",
        lastVerified: { lt: thirtyDaysAgo },
      },
      data: { status: "stale" },
    });

    return NextResponse.json({
      rolesVerified: rolesToVerify.length,
      rolesClosed,
      rolesMarkedStale: staleResult.count,
      durationMs: Date.now() - start,
    });
  } catch (err) {
    console.error("Verify cron failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
