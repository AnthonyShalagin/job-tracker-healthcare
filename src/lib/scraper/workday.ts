import { ScrapedRole, ScraperResult } from "./types";

interface WorkdayJob {
  title: string;
  externalPath: string;
  locationsText?: string;
  postedOn?: string;
  bulletFields?: string[];
}

interface WorkdayResponse {
  jobPostings: WorkdayJob[];
  total?: number;
}

export async function scrapeWorkday(
  companyName: string,
  instance: string,
  slug: string
): Promise<ScraperResult> {
  const start = Date.now();
  const tenant = instance.split(".")[0];

  try {
    const url = `https://${instance}.myworkdayjobs.com/wday/cxs/${tenant}/${slug}/jobs`;

    // Workday CXS API is sensitive to headers. Use minimal headers
    // and explicitly set User-Agent to avoid Vercel's default being rejected.
    const body = JSON.stringify({
      limit: 100,
      offset: 0,
      appliedFacets: {},
      searchText: "",
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body,
      signal: AbortSignal.timeout(15000),
      // @ts-expect-error - Next.js extends fetch with cache options
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      return {
        companyName,
        roles: [],
        error: `Workday API returned ${res.status}: ${errorText.substring(0, 100)}`,
        durationMs: Date.now() - start,
      };
    }

    const data: WorkdayResponse = await res.json();

    if (!data.jobPostings) {
      return {
        companyName,
        roles: [],
        error: "No jobPostings in response",
        durationMs: Date.now() - start,
      };
    }

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
