import { ScrapedRole, ScraperResult } from "./types";

interface WorkdayJob {
  title: string;
  externalPath: string;
  locationsText: string;
  postedOn: string;
  bulletFields?: string[];
}

interface WorkdayResponse {
  jobPostings: WorkdayJob[];
  total: number;
}

export async function scrapeWorkday(
  companyName: string,
  instance: string,
  slug: string
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const url = `https://${instance}.myworkdayjobs.com/wday/cxs/${instance.split(".")[0]}/${slug}/jobs`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "JobTrackerHealthcare/1.0",
      },
      body: JSON.stringify({
        limit: 100,
        offset: 0,
        appliedFacets: {},
        searchText: "",
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return {
        companyName,
        roles: [],
        error: `Workday API returned ${res.status}`,
        durationMs: Date.now() - start,
      };
    }

    const data: WorkdayResponse = await res.json();

    const baseUrl = `https://${instance}.myworkdayjobs.com/en-US/${slug}/job`;

    const roles: ScrapedRole[] = data.jobPostings.map((job) => ({
      externalId: job.externalPath,
      title: job.title,
      url: `${baseUrl}/${job.externalPath}`,
      location: job.locationsText || undefined,
      postedDate: job.postedOn ? new Date(job.postedOn) : undefined,
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
