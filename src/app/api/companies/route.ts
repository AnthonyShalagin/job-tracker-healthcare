import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (category) {
    where.category = category;
  }

  const companies = await prisma.company.findMany({
    where,
    include: {
      roles: {
        where: { status: "active" },
        select: { id: true, title: true, url: true, location: true },
        orderBy: { firstSeen: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const result = companies.map((c) => ({
    id: c.id,
    name: c.name,
    website: c.website,
    careersUrl: c.careersUrl,
    category: c.category,
    glassdoorRating: c.glassdoorRating,
    hiringSignal: c.hiringSignal,
    lastScraped: c.lastScraped,
    activeRoles: c.roles.length,
    roles: c.roles,
  }));

  return NextResponse.json(result);
}
