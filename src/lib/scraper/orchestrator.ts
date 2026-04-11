import { prisma } from "@/lib/prisma";
import { COMPANIES } from "@/lib/companies";
import { isRelevantRole, isRelevantLocation } from "@/lib/filters";
import { scoreRole } from "@/lib/relevance";
import { scrapeGreenhouse } from "./greenhouse";
import { scrapeAshby } from "./ashby";
import { scrapeLever } from "./lever";
import { scrapeWorkday } from "./workday";
import { scrapeSmartRecruiters } from "./smartrecruiters";
import { scrapeICIMS } from "./icims";
import { scrapeHTML } from "./html";
import { scrapeJSearch } from "./jsearch";
import { verifyRoles } from "./verify";
import { sendDigestEmail } from "@/lib/email";
import { CompanyConfig, ScraperResult } from "./types";

const CONCURRENCY = 5;

async function scrapeCompany(config: CompanyConfig): Promise<ScraperResult> {
  switch (config.atsType) {
    case "greenhouse":
      if (!config.atsBoardToken) {
        return {
          companyName: config.name,
          roles: [],
          error: "No board token configured",
          durationMs: 0,
        };
      }
      return scrapeGreenhouse(config.name, config.atsBoardToken);

    case "ashby":
      if (!config.atsBoardToken) {
        return {
          companyName: config.name,
          roles: [],
          error: "No board token configured",
          durationMs: 0,
        };
      }
      return scrapeAshby(config.name, config.atsBoardToken);

    case "lever":
      if (!config.atsBoardToken) {
        return {
          companyName: config.name,
          roles: [],
          error: "No board token configured",
          durationMs: 0,
        };
      }
      return scrapeLever(config.name, config.atsBoardToken);

    case "workday":
      if (!config.workdayInstance || !config.workdaySlug) {
        return {
          companyName: config.name,
          roles: [],
          error: "No Workday instance/slug configured",
          durationMs: 0,
        };
      }
      return scrapeWorkday(config.name, config.workdayInstance, config.workdaySlug);

    case "smartrecruiters":
      if (!config.atsBoardToken) {
        return {
          companyName: config.name,
          roles: [],
          error: "No SmartRecruiters company ID configured",
          durationMs: 0,
        };
      }
      return scrapeSmartRecruiters(config.name, config.atsBoardToken);

    case "icims":
      if (!config.icimsPortal) {
        return {
          companyName: config.name,
          roles: [],
          error: "No iCIMS portal configured",
          durationMs: 0,
        };
      }
      return scrapeICIMS(config.name, config.icimsPortal);

    case "html":
      return scrapeHTML(config);

    default:
      return {
        companyName: config.name,
        roles: [],
        error: `Unsupported ATS type: ${config.atsType}`,
        durationMs: 0,
      };
  }
}

async function runBatch<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const settled = await Promise.allSettled(batch.map(fn));
    for (const r of settled) {
      if (r.status === "fulfilled") results.push(r.value);
    }
  }
  return results;
}

export interface OrchestratorReport {
  totalCompanies: number;
  companiesScraped: number;
  companiesWithErrors: number;
  totalRolesFound: number;
  relevantRoles: number;
  newRoles: number;
  rolesVerified: number;
  rolesClosed: number;
  durationMs: number;
  errors: { company: string; error: string }[];
}

export async function runScrapeOrchestrator(
  companyFilter?: string[]
): Promise<OrchestratorReport> {
  const start = Date.now();
  const configs = companyFilter
    ? COMPANIES.filter((c) =>
        companyFilter.some((f) => c.name.toLowerCase().includes(f.toLowerCase()))
      )
    : COMPANIES;

  // Ensure all companies exist in DB
  for (const config of configs) {
    await prisma.company.upsert({
      where: { name: config.name },
      create: {
        name: config.name,
        website: config.website,
        careersUrl: config.careersUrl,
        atsType: config.atsType,
        atsBoardToken: config.atsBoardToken,
        category: config.category,
        glassdoorRating: config.glassdoorRating,
        glassdoorUrl: config.glassdoorUrl,
      },
      update: {
        careersUrl: config.careersUrl,
        atsType: config.atsType,
        atsBoardToken: config.atsBoardToken,
        category: config.category,
      },
    });
  }

  // Scrape all companies via their native APIs
  const results = await runBatch(configs, scrapeCompany, CONCURRENCY);

  // Also run JSearch to find roles from Google for Jobs (covers Indeed, LinkedIn, etc.)
  try {
    const jsearchResults = await scrapeJSearch();
    results.push(...jsearchResults);
  } catch (err) {
    console.error("JSearch scrape failed:", err);
  }

  let totalRolesFound = 0;
  let relevantRoles = 0;
  let newRoles = 0;
  const errors: { company: string; error: string }[] = [];

  for (const result of results) {
    // For JSearch results, auto-create the company if it doesn't exist
    let company = await prisma.company.findUnique({
      where: { name: result.companyName },
    });

    if (!company && result.roles.length > 0) {
      // Company from JSearch not in our config — create it dynamically
      company = await prisma.company.create({
        data: {
          name: result.companyName,
          website: "",
          careersUrl: "",
          atsType: "unknown",
          category: "jsearch",
        },
      });
    }

    if (!company) continue;

    totalRolesFound += result.roles.length;

    if (result.error) {
      errors.push({ company: result.companyName, error: result.error });
    }

    // Filter to relevant roles — dual check: keyword filter + AI relevance score
    const filtered = result.roles.filter((r) => {
      // First pass: keyword-based filter
      if (!isRelevantRole(r.title) || !isRelevantLocation(r.location)) return false;

      // Second pass: relevance scoring (must score 60+)
      const scored = scoreRole(r.title, result.companyName, r.location ?? null, r.description);
      return scored.pass;
    });
    relevantRoles += filtered.length;

    // Upsert relevant roles
    for (const role of filtered) {
      const existing = role.externalId
        ? await prisma.role.findUnique({
            where: {
              companyId_externalId: {
                companyId: company.id,
                externalId: role.externalId,
              },
            },
          })
        : null;

      if (existing) {
        await prisma.role.update({
          where: { id: existing.id },
          data: {
            title: role.title,
            url: role.url,
            location: role.location,
            salary: role.salary,
            description: role.description,
            lastVerified: new Date(),
            status: "active",
          },
        });
      } else {
        await prisma.role.create({
          data: {
            companyId: company.id,
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
        newRoles++;
      }
    }

    // Log scrape result
    await prisma.scrapeLog.create({
      data: {
        companyId: company.id,
        status: result.error ? "error" : "success",
        rolesFound: filtered.length,
        rolesNew: 0, // Updated below
        errors: result.error,
        durationMs: result.durationMs,
      },
    });

    // Update company timestamps and hiring signal
    const activeRoleCount = await prisma.role.count({
      where: { companyId: company.id, status: "active" },
    });

    const recentRole = await prisma.role.findFirst({
      where: { companyId: company.id },
      orderBy: { firstSeen: "desc" },
    });

    let hiringSignal = "cold_outreach";
    if (recentRole) {
      const daysSinceNewest = Math.floor(
        (Date.now() - recentRole.firstSeen.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceNewest <= 7 && activeRoleCount > 0) hiringSignal = "active";
      else if (daysSinceNewest <= 30 && activeRoleCount > 0) hiringSignal = "dormant";
    }

    await prisma.company.update({
      where: { id: company.id },
      data: { lastScraped: new Date(), hiringSignal },
    });
  }

  // Verify ALL active roles — visit each page to confirm it's still live
  const rolesToVerify = await prisma.role.findMany({
    where: {
      status: "active",
    },
    select: { id: true, url: true },
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

  // Mark roles not seen in 30+ days as stale
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await prisma.role.updateMany({
    where: {
      status: "active",
      lastVerified: { lt: thirtyDaysAgo },
    },
    data: { status: "stale" },
  });

  // Send daily email digest with all active roles
  const allActiveRoles = await prisma.role.findMany({
    where: {
      status: "active",
      userStatus: { not: "dismissed" },
    },
    include: { company: true },
    orderBy: [{ firstSeen: "desc" }],
  });

  if (allActiveRoles.length > 0) {
    try {
      await sendDigestEmail(allActiveRoles, newRoles);
    } catch (err) {
      console.error("Failed to send digest email:", err);
    }
  }

  return {
    totalCompanies: configs.length,
    companiesScraped: results.length,
    companiesWithErrors: errors.length,
    totalRolesFound,
    relevantRoles,
    newRoles,
    rolesVerified: rolesToVerify.length,
    rolesClosed,
    durationMs: Date.now() - start,
    errors,
  };
}
