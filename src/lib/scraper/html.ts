import * as cheerio from "cheerio";
import { ScrapedRole, ScraperResult, CompanyConfig } from "./types";

export async function scrapeHTML(config: CompanyConfig): Promise<ScraperResult> {
  const start = Date.now();

  if (!config.selectors) {
    return {
      companyName: config.name,
      roles: [],
      error: "No CSS selectors configured for HTML scraping",
      durationMs: Date.now() - start,
    };
  }

  try {
    const res = await fetch(config.careersUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return {
        companyName: config.name,
        roles: [],
        error: `HTTP ${res.status} from ${config.careersUrl}`,
        durationMs: Date.now() - start,
      };
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const roles: ScrapedRole[] = [];

    $(config.selectors.jobList).each((_, el) => {
      const titleEl = $(el).find(config.selectors!.jobTitle);
      const linkEl = $(el).find(config.selectors!.jobLink);
      const title = titleEl.text().trim();
      let url = linkEl.attr("href") || "";

      if (!title || !url) return;

      // Resolve relative URLs
      if (url.startsWith("/")) {
        const base = new URL(config.careersUrl);
        url = `${base.origin}${url}`;
      } else if (!url.startsWith("http")) {
        const base = new URL(config.careersUrl);
        url = `${base.origin}/${url}`;
      }

      const location = config.selectors!.jobLocation
        ? $(el).find(config.selectors!.jobLocation).text().trim() || undefined
        : undefined;

      roles.push({
        externalId: new URL(url).pathname,
        title,
        url,
        location,
      });
    });

    return {
      companyName: config.name,
      roles,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      companyName: config.name,
      roles: [],
      error: err instanceof Error ? err.message : "Unknown error",
      durationMs: Date.now() - start,
    };
  }
}
