import { ScrapedRole, ScraperResult } from "./types";

const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

interface JSearchJob {
  job_id: string;
  job_title: string;
  job_apply_link: string;
  employer_name: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_is_remote: boolean;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_description: string;
  job_posted_at_datetime_utc: string;
}

interface JSearchResponse {
  status: string;
  data: JSearchJob[];
}

function formatLocation(job: JSearchJob): string {
  if (job.job_is_remote) return "Remote";
  const parts = [job.job_city, job.job_state].filter(Boolean);
  return parts.join(", ") || "United States";
}

function formatSalary(job: JSearchJob): string | undefined {
  if (!job.job_min_salary && !job.job_max_salary) return undefined;
  const fmt = (n: number) =>
    n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
  if (job.job_min_salary && job.job_max_salary) {
    return `${fmt(job.job_min_salary)} - ${fmt(job.job_max_salary)}${job.job_salary_period === "YEAR" ? "/yr" : ""}`;
  }
  return fmt(job.job_min_salary || job.job_max_salary || 0);
}

/**
 * Search JSearch (Google for Jobs aggregator) for roles matching a query.
 * Requires RAPIDAPI_KEY env var.
 */
async function searchJSearch(
  query: string,
  page: number = 1
): Promise<JSearchJob[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    query,
    page: String(page),
    num_pages: "1",
    date_posted: "month", // Last 30 days to backfill roles posted during the cron outage
    remote_jobs_only: "false",
    employment_types: "FULLTIME",
  });

  const res = await fetch(`https://${RAPIDAPI_HOST}/search?${params}`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`JSearch API returned ${res.status}`);
  }

  const data: JSearchResponse = await res.json();
  return data.data || [];
}

/**
 * Run multiple JSearch queries targeting healthcare director-level roles.
 * Uses ~10 API calls per run (well within 1,000/month free tier for daily use).
 */
export async function scrapeJSearch(): Promise<ScraperResult[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return [
      {
        companyName: "JSearch",
        roles: [],
        error: "RAPIDAPI_KEY not set",
        durationMs: 0,
      },
    ];
  }

  const start = Date.now();

  // Targeted queries — each one costs 1 API credit
  // Location-anchored to NYC/NJ/remote to maximize hit rate within commute range.
  // Plus one nationwide "remote" query to catch work-from-home roles.
  const queries = [
    '"director of rehabilitation" OR "rehabilitation director" healthcare "New York" OR "New Jersey" OR remote',
    '"director of operations" OR "director of clinical operations" healthcare "New York" OR "New Jersey" OR "Jersey City"',
    '"program director" healthcare OR IDD OR "developmental disabilities" "New York" OR "New Jersey"',
    '"VP of operations" OR "vice president of operations" healthcare "New York" OR "New Jersey" OR remote',
    '"director of quality" OR "director of care coordination" OR "clinical operations manager" healthcare remote',
    '"senior director" OR "executive director" healthcare operations "New York" OR "New Jersey"',
    '"regional director" OR "area director" healthcare "New York" OR "New Jersey"',
  ];

  const allJobs: JSearchJob[] = [];
  const errors: string[] = [];

  // Run queries with concurrency of 3 to avoid rate limits
  for (let i = 0; i < queries.length; i += 3) {
    const batch = queries.slice(i, i + 3);
    const settled = await Promise.allSettled(
      batch.map((q) => searchJSearch(q))
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        allJobs.push(...result.value);
      } else {
        errors.push(result.reason?.message || "Unknown error");
      }
    }
  }

  // Deduplicate by job_id
  const seen = new Set<string>();
  const unique: JSearchJob[] = [];
  for (const job of allJobs) {
    if (!seen.has(job.job_id)) {
      seen.add(job.job_id);
      unique.push(job);
    }
  }

  // Group by employer so each company gets its own ScraperResult
  const byEmployer = new Map<string, ScrapedRole[]>();
  for (const job of unique) {
    const employer = job.employer_name || "Unknown";
    if (!byEmployer.has(employer)) {
      byEmployer.set(employer, []);
    }
    byEmployer.get(employer)!.push({
      externalId: job.job_id,
      title: job.job_title,
      url: job.job_apply_link,
      location: formatLocation(job),
      salary: formatSalary(job),
      description: job.job_description?.slice(0, 2000),
      postedDate: job.job_posted_at_datetime_utc
        ? new Date(job.job_posted_at_datetime_utc)
        : undefined,
    });
  }

  const results: ScraperResult[] = [];
  for (const [employer, roles] of byEmployer) {
    results.push({
      companyName: employer,
      roles,
      durationMs: Date.now() - start,
    });
  }

  if (results.length === 0) {
    results.push({
      companyName: "JSearch",
      roles: [],
      error: errors.length > 0 ? errors.join("; ") : "No results found",
      durationMs: Date.now() - start,
    });
  }

  console.log(
    `JSearch: ${queries.length} queries, ${unique.length} unique jobs from ${byEmployer.size} employers in ${Date.now() - start}ms`
  );

  return results;
}
