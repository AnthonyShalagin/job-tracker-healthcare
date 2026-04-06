import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const company = searchParams.get("company");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "firstSeen";
  const order = searchParams.get("order") || "desc";

  const where: Record<string, unknown> = {};

  if (status && status !== "all") {
    where.status = status;
  } else {
    // By default exclude closed roles
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

  const orderBy: Record<string, string> = {};
  if (sort === "company") {
    // Can't sort by relation field this way, use firstSeen fallback
    orderBy.firstSeen = order;
  } else {
    orderBy[sort] = order;
  }

  const roles = await prisma.role.findMany({
    where,
    include: {
      company: {
        select: { name: true, category: true, website: true },
      },
    },
    orderBy,
    take: 200,
  });

  return NextResponse.json(roles);
}
