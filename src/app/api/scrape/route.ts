import { NextResponse } from "next/server";
import { runScrapeOrchestrator } from "@/lib/scraper/orchestrator";

export const maxDuration = 60;

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const companies = body.companies as string[] | undefined;

    const report = await runScrapeOrchestrator(companies);
    return NextResponse.json(report);
  } catch (err) {
    console.error("Manual scrape failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
