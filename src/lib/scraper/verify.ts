const CLOSED_PHRASES = [
  "position has been filled",
  "no longer accepting",
  "this job is closed",
  "this position has been closed",
  "job is no longer available",
  "this posting has been removed",
  "page not found",
  "404",
  "this role has been filled",
  "no longer available",
  "expired",
  "this position is no longer open",
];

export async function verifyRoleLink(url: string): Promise<"active" | "closed"> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 404 || res.status === 410) {
      return "closed";
    }

    if (!res.ok) {
      // Can't determine — assume active to avoid false negatives
      return "active";
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return "active";
    }

    const html = await res.text();
    const lower = html.toLowerCase();

    for (const phrase of CLOSED_PHRASES) {
      if (lower.includes(phrase)) {
        return "closed";
      }
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
