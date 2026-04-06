// @ts-nocheck - ts-jobspy has incomplete type definitions
import { ScrapedRole, ScraperResult } from "./types";

interface JobSpyResult {
  title?: string;
  company?: string;
  location?: string;
  job_url?: string;
  date_posted?: string;
  min_amount?: number;
  max_amount?: number;
  currency?: string;
  interval?: string;
  description?: string;
  id?: string;
}

export async function scrapeIndeed(
  searchQuery: string,
  location: string = "New Jersey"
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const { scrapeJobs, Site } = await import("ts-jobspy");

    const results = await scrapeJobs({
      site_name: [Site.INDEED],
      search_term: searchQuery,
      location,
      results_wanted: 50,
      country_indeed: "USA",
    });

    const roles: ScrapedRole[] = (results as unknown as JobSpyResult[]).map((job) => {
      let salary: string | undefined;
      if (job.min_amount && job.max_amount) {
        salary = `${job.currency || "$"}${job.min_amount.toLocaleString()}-${job.max_amount.toLocaleString()}/${job.interval || "year"}`;
      }

      return {
        externalId: job.id || job.job_url || `indeed-${job.title}-${job.company}`,
        title: job.title || "Unknown Title",
        url: job.job_url || "",
        location: job.location,
        salary,
        description: job.description?.slice(0, 500),
        department: job.company,
        postedDate: job.date_posted ? new Date(job.date_posted) : undefined,
      };
    });

    return {
      companyName: `Indeed: "${searchQuery}"`,
      roles,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      companyName: `Indeed: "${searchQuery}"`,
      roles: [],
      error: err instanceof Error ? err.message : "Unknown error",
      durationMs: Date.now() - start,
    };
  }
}
