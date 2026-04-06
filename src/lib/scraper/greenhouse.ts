import { ScrapedRole, ScraperResult } from "./types";

interface GreenhouseJob {
  id: number;
  title: string;
  absolute_url: string;
  updated_at: string;
  location: { name: string };
  departments: { name: string }[];
  content?: string;
}

interface GreenhouseResponse {
  jobs: GreenhouseJob[];
}

export async function scrapeGreenhouse(
  companyName: string,
  boardToken: string
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const res = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs?content=true`,
      {
        headers: { "User-Agent": "JobTrackerHealthcare/1.0" },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return {
        companyName,
        roles: [],
        error: `Greenhouse API returned ${res.status}`,
        durationMs: Date.now() - start,
      };
    }

    const data: GreenhouseResponse = await res.json();

    const roles: ScrapedRole[] = data.jobs.map((job) => {
      // Strip HTML from content for description
      const description = job.content
        ? job.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500)
        : undefined;

      return {
        externalId: String(job.id),
        title: job.title,
        url: job.absolute_url,
        location: job.location?.name || undefined,
        description,
        department: job.departments?.[0]?.name,
        postedDate: job.updated_at ? new Date(job.updated_at) : undefined,
      };
    });

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
