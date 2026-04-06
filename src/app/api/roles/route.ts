import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scoreRole } from "@/lib/relevance";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const company = searchParams.get("company");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (status && status !== "all") {
    where.status = status;
  } else {
    where.status = { not: "closed" };
  }

  if (company) {
    where.company = { name: company };
  }

  if (category) {
    where.company = { ...(where.company as object || {}), category };
  }

  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const roles = await prisma.role.findMany({
    where,
    include: {
      company: {
        select: { name: true, category: true, website: true },
      },
    },
    take: 200,
  });

  // Compute relevance score for each role and sort:
  // 1. Most recent first (within same day)
  // 2. Highest relevance score within same recency tier
  const scored = roles.map((role) => {
    const s = scoreRole(role.title, role.company.name, role.location, role.description ?? undefined);
    const postedMs = new Date(role.postedDate || role.firstSeen).getTime();
    const daysAgo = Math.floor((Date.now() - postedMs) / (1000 * 60 * 60 * 24));

    // Recency tier: 0 = today, 1 = yesterday, 2 = this week, 3 = this month, 4 = older
    let recencyTier = 4;
    if (daysAgo === 0) recencyTier = 0;
    else if (daysAgo === 1) recencyTier = 1;
    else if (daysAgo <= 7) recencyTier = 2;
    else if (daysAgo <= 30) recencyTier = 3;

    return {
      ...role,
      relevanceScore: s.score,
      recencyTier,
    };
  });

  // Sort: recency tier first (newest first), then relevance score within tier (highest first)
  scored.sort((a, b) => {
    // Dismissed roles always at bottom
    if (a.userStatus === "dismissed" && b.userStatus !== "dismissed") return 1;
    if (b.userStatus === "dismissed" && a.userStatus !== "dismissed") return -1;

    // Then by recency tier
    if (a.recencyTier !== b.recencyTier) return a.recencyTier - b.recencyTier;

    // Then by relevance score (highest first)
    return b.relevanceScore - a.relevanceScore;
  });

  return NextResponse.json(scored);
}
