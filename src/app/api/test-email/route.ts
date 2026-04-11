import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDigestEmail } from "@/lib/email";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allActiveRoles = await prisma.role.findMany({
    where: {
      status: "active",
      userStatus: { not: "dismissed" },
    },
    include: { company: true },
    orderBy: [{ firstSeen: "desc" }],
  });

  if (allActiveRoles.length === 0) {
    return NextResponse.json({ error: "No active roles to send" }, { status: 404 });
  }

  try {
    await sendDigestEmail(allActiveRoles, 0);
    return NextResponse.json({
      success: true,
      rolesSent: allActiveRoles.length,
      recipients: (process.env.NOTIFICATION_EMAILS || "").split(",").filter(Boolean).length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
