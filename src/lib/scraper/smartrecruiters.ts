import { ScrapedRole, ScraperResult } from "./types";

interface SmartRecruitersJob {
  id: string;
  name: string;
  location: {
    city?: string;
    region?: string;
    country?: string;
    remote?: boolean;
  };
  releasedDate: string;
  ref: string;
  company: { name: string };
  department?: { label: string };
  compensation?: {
    min?: { value: number; currency: string };
    max?: { value: number; currency: string };
  };
}

interface SmartRecruitersResponse {
  content: SmartRecruitersJob[];
  totalFound: number;
}

export async function scrapeSmartRecruiters(
  companyName: string,
  companyId: string
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const res = await fetch(
      `https://api.smartrecruiters.com/v1/companies/${companyId}/postings?limit=100&offset=0`,
      {
        headers: { "User-Agent": "JobTrackerHealthcare/1.0" },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return {
        companyName,
        roles: [],
        error: `SmartRecruiters API returned ${res.status}`,
        durationMs: Date.now() - start,
      };
    }

    const data: SmartRecruitersResponse = await res.json();

    const roles: ScrapedRole[] = data.content.map((job) => {
      const locationParts = [job.location.city, job.location.region].filter(Boolean);
      const location = job.location.remote
        ? "Remote"
        : locationParts.join(", ") || undefined;

      let salary: string | undefined;
      if (job.compensation?.min && job.compensation?.max) {
        salary = `${job.compensation.min.currency} ${job.compensation.min.value.toLocaleString()}-${job.compensation.max.value.toLocaleString()}`;
      }

      return {
        externalId: job.id,
        title: job.name,
        url: `https://jobs.smartrecruiters.com/${companyId}/${job.id}`,
        location,
        salary,
        department: job.department?.label,
        postedDate: job.releasedDate ? new Date(job.releasedDate) : undefined,
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
