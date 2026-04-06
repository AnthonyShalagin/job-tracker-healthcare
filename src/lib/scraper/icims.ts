import * as cheerio from "cheerio";
import { ScrapedRole, ScraperResult } from "./types";

/**
 * iCIMS scraper using sitemap.xml approach.
 * iCIMS career portals expose a sitemap at /sitemap.xml with all job URLs.
 * We fetch the sitemap, extract job URLs, then parse each job page.
 */
export async function scrapeICIMS(
  companyName: string,
  portalDomain: string // e.g. "careers-hackensackmeridianhealth.icims.com"
): Promise<ScraperResult> {
  const start = Date.now();

  try {
    // Step 1: Fetch sitemap
    const sitemapUrl = `https://${portalDomain}/sitemap.xml`;
    const sitemapRes = await fetch(sitemapUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/xml, text/xml",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!sitemapRes.ok) {
      return {
        companyName,
        roles: [],
        error: `Sitemap returned ${sitemapRes.status} from ${sitemapUrl}`,
        durationMs: Date.now() - start,
      };
    }

    const sitemapXml = await sitemapRes.text();
    const $ = cheerio.load(sitemapXml);

    // Extract job URLs from sitemap
    const jobUrls: string[] = [];
    $("url loc").each((_, el) => {
      const url = $(el).text().trim();
      // iCIMS job URLs contain /jobs/ followed by a numeric ID
      if (url.includes("/jobs/") && /\/jobs\/\d+/.test(url)) {
        jobUrls.push(url);
      }
    });

    if (jobUrls.length === 0) {
      return {
        companyName,
        roles: [],
        error: "No job URLs found in sitemap",
        durationMs: Date.now() - start,
      };
    }

    // Step 2: Fetch job pages (limit to 50 to stay within time budget)
    const urlsToFetch = jobUrls.slice(0, 50);
    const roles: ScrapedRole[] = [];

    // Fetch in batches of 5 with delays
    for (let i = 0; i < urlsToFetch.length; i += 5) {
      const batch = urlsToFetch.slice(i, i + 5);
      const results = await Promise.allSettled(
        batch.map(async (url) => {
          const pageRes = await fetch(`${url}?in_iframe=1`, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            },
            signal: AbortSignal.timeout(10000),
          });

          if (!pageRes.ok) return null;

          const html = await pageRes.text();
          const page$ = cheerio.load(html);

          const title =
            page$("h1.iCIMS_Header").text().trim() ||
            page$(".iCIMS_JobHeaderTitle").text().trim() ||
            page$("h1").first().text().trim();

          const location =
            page$(".iCIMS_JobHeaderField:contains('Location')").next().text().trim() ||
            page$(".header-field:contains('Location')").text().replace("Location:", "").trim();

          if (!title) return null;

          // Extract job ID from URL
          const idMatch = url.match(/\/jobs\/(\d+)/);
          const externalId = idMatch ? idMatch[1] : url;

          return {
            externalId,
            title,
            url,
            location: location || undefined,
          } as ScrapedRole;
        })
      );

      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          roles.push(result.value);
        }
      }

      // Small delay between batches
      if (i + 5 < urlsToFetch.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

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
