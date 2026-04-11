import { NextResponse } from "next/server";
import { runScrapeOrchestrator } from "@/lib/scraper/orchestrator";

export const maxDuration = 300;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await runScrapeOrchestrator();
    return NextResponse.json(report);
  } catch (err) {
    console.error("Cron scrape failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
