"use client";

export default function HowItWorksPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          How It Works
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          What this tool does, how it finds jobs, and why it is better than searching manually
        </p>
      </div>

      <div className="space-y-6">
        {/* The Problem */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">The Problem</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed">
            Searching for director-level healthcare jobs is frustrating. You check LinkedIn, Indeed, Glassdoor,
            and dozens of company career pages — and most of the listings are either irrelevant, already closed,
            or in locations you cannot commute to. By the time you find something good, it has been posted for
            weeks and already has hundreds of applicants.
          </p>
        </section>

        {/* What This Tool Does */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What This Tool Does</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-4">
            This tool does the searching for you, automatically, every single day. Here is what happens behind the scenes:
          </p>
          <ol className="space-y-4">
            {[
              {
                title: "Scans 147 healthcare companies",
                detail: "Every morning at 7 AM, the tool visits the career pages of 147 companies — health systems, rehab companies, IDD providers, telehealth companies, nonprofits, and more. It connects directly to their job posting systems to pull fresh listings."
              },
              {
                title: "Filters for roles that match your background",
                detail: "Out of thousands of job listings, it keeps only director-level operations and clinical leadership roles — the kind of roles that match your experience as a Program Director, Director of Rehab, and Senior Manager of Healthcare Operations."
              },
              {
                title: "Scores every role for relevance",
                detail: "Each role gets a relevance score from 0 to 100. The score is based on how well the title matches your target roles, whether the company is in your target industry (rehab, IDD, behavioral health, etc.), and whether the location works for you. Only roles scoring 60 or higher make it to the dashboard."
              },
              {
                title: "Checks that postings are still active",
                detail: "Many job boards show listings that have already been filled. This tool verifies each posting is still live by checking the actual job page — if it returns a 'position closed' message, the role is removed from your dashboard."
              },
              {
                title: "Sends you an email with new findings",
                detail: "If new relevant roles are found, you get an email with a table of the new postings — each title links directly to the application page. No email on days with nothing new (no inbox clutter)."
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-[13px] font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-stone-800">{step.title}</p>
                  <p className="text-[13px] text-stone-500 mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* The Relevance Dots */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What the Colored Dots Mean</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-4">
            Next to each role title, you may see a small colored dot. This is the relevance score:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <p className="text-[14px] font-medium text-stone-800">Green dot — Strong match (80+)</p>
                <p className="text-[13px] text-stone-500">Title, industry, and location are all a great fit. Prioritize these.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-400 shrink-0" />
              <div>
                <p className="text-[14px] font-medium text-stone-800">Blue dot — Good match (65-79)</p>
                <p className="text-[13px] text-stone-500">Worth reviewing. May be a slightly different setting or title than ideal.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-stone-300 shrink-0" />
              <div>
                <p className="text-[14px] font-medium text-stone-800">Gray dot — Possible match (60-64)</p>
                <p className="text-[13px] text-stone-500">Meets the minimum criteria but may not be as strong a fit. Review carefully.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Roles Are Sorted */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">How Roles Are Sorted</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed">
            The dashboard shows the most important roles at the top using two factors:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2 text-[14px] text-stone-600">
              <span className="text-stone-400 mt-0.5">1.</span>
              <span><strong>Recency first</strong> — roles posted today appear above roles posted last week, which appear above older ones.</span>
            </li>
            <li className="flex items-start gap-2 text-[14px] text-stone-600">
              <span className="text-stone-400 mt-0.5">2.</span>
              <span><strong>Then by relevance</strong> — within the same time period, roles with higher relevance scores appear first.</span>
            </li>
          </ul>
          <p className="text-[13px] text-stone-500 mt-3">
            This means the role at the very top of your dashboard is always the most recent, most relevant role available right now.
          </p>
        </section>

        {/* What Gets Filtered Out */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What Gets Filtered Out</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-3">
            The tool automatically removes roles that do not fit your profile:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Sales, marketing, and business development roles",
              "Engineering, product, and data science roles",
              "Finance, accounting, and legal roles",
              "Pharma, clinical trials, and drug development",
              "Roles requiring an MD or RN license",
              "Treating clinician roles (PT, OT, SLP without leadership)",
              "Locations more than 1 hour from Jersey City by public transit",
              "HR, recruiting, and talent acquisition roles",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-[13px] text-stone-500">
                <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Advantage Over Manual Searching */}
        <section className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-blue-200/60 p-6">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">Why This Is Better Than Searching Manually</h2>
          <div className="space-y-3">
            {[
              { bold: "Covers 147 companies at once", detail: "You would need to visit 147 different career pages every day. This does it in 48 seconds." },
              { bold: "No stale listings", detail: "Every posting is verified as active. Closed jobs are automatically removed." },
              { bold: "Filters out the noise", detail: "Indeed shows you dental assistants when you search for 'director of rehabilitation.' This tool uses a relevance scoring system that only shows roles matching your specific background." },
              { bold: "Catches roles faster", detail: "The daily scan means you see new roles within 24 hours of being posted — before most applicants find them." },
              { bold: "Remembers your progress", detail: "Mark roles as Interested, Applied, or Not Relevant. The dashboard remembers everything, so you never lose track of where you are." },
              { bold: "Goes beyond job boards", detail: "Most job seekers only check Indeed and LinkedIn. This tool connects directly to company career systems (Greenhouse, Ashby, Lever) where roles are posted before they hit the big job boards." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[14px] text-stone-700">
                  <strong>{item.bold}.</strong> {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where It Gets Jobs From */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">Where Jobs Come From</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-3">
            Jobs are pulled from multiple sources every day:
          </p>
          <div className="space-y-2 text-[13px]">
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Company career pages (Greenhouse, Ashby, Lever APIs)</span>
              <span className="text-stone-400">~40 companies</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Company career pages (iCIMS sitemaps)</span>
              <span className="text-stone-400">~4 companies</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Indeed, LinkedIn, Glassdoor (browser-based search)</span>
              <span className="text-stone-400">periodic manual scans</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-stone-600">Manually verified company career sites</span>
              <span className="text-stone-400">~100 companies monitored</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
