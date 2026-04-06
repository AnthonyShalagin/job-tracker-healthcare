import { ScrapedRole, ScraperResult } from "./types";

interface LeverPosting {
  id: string;
  text: string;
  hostedUrl: string;
  categories: {
    location?: string;
    team?: string;
    department?: string;
    commitment?: string;
  };
  createdAt: number;
  descriptionPlain?: string;
  additionalPlain?: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
    interval: string;
  };
}

export async function scrapeLever(
  companyName: string,
  boardToken: string
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    const res = await fetch(
      `https://api.lever.co/v0/postings/${boardToken}?mode=json`,
      {
        headers: { "User-Agent": "JobTrackerHealthcare/1.0" },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return {
        companyName,
        roles: [],
        error: `Lever API returned ${res.status}`,
        durationMs: Date.now() - start,
      };
    }

    const data: LeverPosting[] = await res.json();

    const roles: ScrapedRole[] = data.map((posting) => {
      let salary: string | undefined;
      if (posting.salaryRange) {
        const { min, max, currency, interval } = posting.salaryRange;
        salary = `${currency} ${min.toLocaleString()}-${max.toLocaleString()}/${interval}`;
      }

      return {
        externalId: posting.id,
        title: posting.text,
        url: posting.hostedUrl,
        location: posting.categories?.location || undefined,
        salary,
        description: posting.descriptionPlain?.slice(0, 500),
        department: posting.categories?.team || posting.categories?.department,
        postedDate: posting.createdAt ? new Date(posting.createdAt) : undefined,
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
