import { ScrapedRole, ScraperResult } from "./types";

interface AshbyJob {
  id: string;
  title: string;
  jobUrl: string;
  location: string;
  publishedDate: string;
  compensationTierSummary?: string;
  departmentName?: string;
  descriptionPlain?: string;
}

interface AshbyResponse {
  jobs: AshbyJob[];
}

export async function scrapeAshby(
  companyName: string,
  boardToken: string
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const res = await fetch(
      `https://api.ashbyhq.com/posting-api/job-board/${boardToken}?includeCompensation=true`,
      {
        headers: { "User-Agent": "JobTrackerHealthcare/1.0" },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return {
        companyName,
        roles: [],
        error: `Ashby API returned ${res.status}`,
        durationMs: Date.now() - start,
      };
    }

    const data: AshbyResponse = await res.json();

    const roles: ScrapedRole[] = data.jobs.map((job) => ({
      externalId: job.id,
      title: job.title,
      url: job.jobUrl,
      location: job.location || undefined,
      salary: job.compensationTierSummary || undefined,
      description: job.descriptionPlain?.slice(0, 500),
      department: job.departmentName,
      postedDate: job.publishedDate ? new Date(job.publishedDate) : undefined,
    }));

    return {
      companyName,
      roles,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      companyName,
      roles: [],
      error: err instanceof Error ? err.message : "Unknown error",
      durationMs: Date.now() - start,
    };
  }
}
