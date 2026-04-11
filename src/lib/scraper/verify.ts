const CLOSED_PHRASES = [
  "position has been filled",
  "no longer accepting",
  "this job is closed",
  "this position has been closed",
  "job is no longer available",
  "this posting has been removed",
  "page not found",
  "this role has been filled",
  "no longer available",
  "this position is no longer open",
  "job has been closed",
  "position is closed",
  "this job has expired",
  "this listing has expired",
  "sorry, this position has already been filled",
  "this job posting is no longer active",
  "this requisition is no longer active",
  "the position you were looking for is no longer open",
  "this job no longer exists",
  "job not found",
  "posting not found",
  "application is closed",
  "applications are closed",
  "we are no longer accepting applications",
  "this opportunity is no longer available",
];

// Greenhouse/Lever/Ashby-specific closed page indicators
const ATS_CLOSED_INDICATORS = [
  '"status":"closed"',
  '"status":"archived"',
  "greenhouse-job-board-closed",
  "lever-application-closed",
  "job-board--empty", // Ashby empty board class
];

export async function verifyRoleLink(url: string): Promise<"active" | "closed"> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    // 404 or 410 = definitely closed
    if (res.status === 404 || res.status === 410) {
      return "closed";
    }

    // Check if the URL redirected to a different page (common for expired jobs
    // that redirect to the main careers page or job board listing)
    const finalUrl = res.url;
    if (finalUrl) {
      const originalPath = new URL(url).pathname;
      const finalPath = new URL(finalUrl).pathname;
      // If redirected to root, /careers, /jobs, or /job-board — the specific job is gone
      const genericPaths = ["/", "/careers", "/jobs", "/job-board", "/open-positions"];
      if (
        originalPath !== finalPath &&
        genericPaths.some((p) => finalPath === p || finalPath === p + "/")
      ) {
        return "closed";
      }
    }

    if (!res.ok) {
      return "active"; // Can't determine — assume active
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/json")) {
      return "active";
    }

    const body = await res.text();
    const lower = body.toLowerCase();

    // Check plain-text closed phrases
    for (const phrase of CLOSED_PHRASES) {
      if (lower.includes(phrase)) {
        return "closed";
      }
    }

    // Check ATS-specific indicators
    for (const indicator of ATS_CLOSED_INDICATORS) {
      if (lower.includes(indicator)) {
        return "closed";
      }
    }

    // Check if page is essentially empty (some ATS return blank page for closed jobs)
    const textContent = body.replace(/<[^>]*>/g, "").trim();
    if (textContent.length < 100) {
      return "closed";
    }

    return "active";
  } catch {
    // Network error — can't verify, assume active
    return "active";
  }
}

export async function verifyRoles(
  roles: { id: string; url: string }[]
): Promise<Map<string, "active" | "closed">> {
  const results = new Map<string, "active" | "closed">();
  const CONCURRENCY = 10;

  for (let i = 0; i < roles.length; i += CONCURRENCY) {
    const batch = roles.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(
      batch.map(async (role) => {
        const status = await verifyRoleLink(role.url);
        return { id: role.id, status };
      })
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.set(result.value.id, result.value.status);
      }
    }
  }

  return results;
}
