import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isRelevantRole, isRelevantLocation } from "@/lib/filters";
import { scrapeIndeed } from "@/lib/scraper/jobspy";

export const maxDuration = 60;

const SEARCH_QUERIES = [
  "director of rehabilitation",
  "director of operations healthcare",
  "director of clinical operations",
  "director of clinical services",
  "director of patient services",
  "director of quality healthcare",
  "director of care coordination",
  "VP operations healthcare",
  "program director healthcare",
  "rehabilitation director",
];

const LOCATIONS = [
  "New Jersey",
  "New York City, NY",
];

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const queries = (body.queries as string[]) || SEARCH_QUERIES.slice(0, 3);
  const locations = (body.locations as string[]) || LOCATIONS;

  let totalFound = 0;
  let totalRelevant = 0;
  let totalNew = 0;
  const errors: string[] = [];

  for (const query of queries) {
    for (const location of locations) {
      try {
        const result = await scrapeIndeed(query, location);

        if (result.error) {
          errors.push(`${query} in ${location}: ${result.error}`);
          continue;
        }

        totalFound += result.roles.length;

        // Filter for relevance
        const filtered = result.roles.filter(
          (r) => isRelevantRole(r.title) && isRelevantLocation(r.location) && r.url
        );
        totalRelevant += filtered.length;

        // Find or create a "search" company for tracking
        const searchCompany = await prisma.company.upsert({
          where: { name: `Indeed: ${location}` },
          create: {
            name: `Indeed: ${location}`,
            website: "https://www.indeed.com",
            careersUrl: `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`,
            atsType: "html",
            category: "staffing",
          },
          update: { lastScraped: new Date() },
        });

        for (const role of filtered) {
          const existing = await prisma.role.findFirst({
            where: {
              companyId: searchCompany.id,
              url: role.url,
            },
          });

          if (!existing) {
            await prisma.role.create({
              data: {
                companyId: searchCompany.id,
                externalId: role.externalId,
                title: role.title,
                url: role.url,
                location: role.location,
                salary: role.salary,
                description: role.description,
                postedDate: role.postedDate,
                status: "active",
                firstSeen: new Date(),
                lastVerified: new Date(),
              },
            });
            totalNew++;
          }
        }
      } catch (err) {
        errors.push(`${query} in ${location}: ${err instanceof Error ? err.message : "Unknown"}`);
      }
    }
  }

  return NextResponse.json({
    totalFound,
    totalRelevant,
    totalNew,
    queries: queries.length,
    locations: locations.length,
    errors,
  });
}
