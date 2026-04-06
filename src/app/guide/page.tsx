"use client";

export default function GuidePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
            How to Use This
          </h1>
          <p className="text-[13px] text-stone-500 mt-0.5">
            Everything you need to get the most out of the Job Tracker
          </p>
        </div>
        <a
          href="/emma-guide.pdf"
          download
          className="shrink-0 px-4 py-2 bg-stone-800 text-white text-[13px] font-medium rounded-lg hover:bg-stone-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download PDF
        </a>
      </div>

      <div className="space-y-8">
        {/* What This Is */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What This Is</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed">
            This tool automatically monitors <strong>147 healthcare companies</strong> every morning at 7 AM.
            It filters for director-level operations and clinical leadership roles that match your background,
            verifies postings are still active, and sends an email digest with new findings.
          </p>
          <p className="text-[14px] text-stone-600 leading-relaxed mt-3">
            No more clicking through stale job listings. If a role is on the dashboard, it has been verified as active.
          </p>
        </section>

        {/* Daily Routine */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">Your Daily Routine (2 minutes)</h2>
          <ol className="space-y-3">
            {[
              { step: "Check your email", detail: "New roles arrive at 7 AM. Each title links directly to the posting." },
              { step: "Visit the Roles tab", detail: "Look for the green NEW badge — those are roles found in the last 24 hours." },
              { step: "Track what you see", detail: "Click Track on any role to mark it as Interested, Applied, or Not Relevant." },
              { step: "Check Leads weekly", detail: "The Leads tab shows companies with active hiring signals — COO transitions, expansions, mergers." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[12px] font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-stone-800">{item.step}</p>
                  <p className="text-[13px] text-stone-500 mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What Each Tab Does */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-4">What Each Tab Does</h2>
          <div className="space-y-4">
            {[
              {
                name: "Roles",
                desc: "All active director-level roles. Filter by category or search by title. Sort by posted date to see newest first. Each role links directly to the job posting.",
                color: "bg-blue-500",
              },
              {
                name: "Companies",
                desc: "Shows only companies with active relevant roles. Each role is listed by title and links to the posting. Companies with zero matches are hidden.",
                color: "bg-emerald-500",
              },
              {
                name: "Leads",
                desc: "Companies with active hiring signals — new COOs, PE acquisitions, facility expansions, mergers. Shows urgency level, who to contact, and what to do.",
                color: "bg-red-500",
              },
              {
                name: "Resources",
                desc: "Executive recruiters (all free to register), healthcare job boards, upcoming events and job fairs, newsletters, and professional communities.",
                color: "bg-violet-500",
              },
            ].map((tab) => (
              <div key={tab.name} className="flex gap-3">
                <span className={`shrink-0 w-2 h-2 rounded-full mt-2 ${tab.color}`} />
                <div>
                  <p className="text-[14px] font-medium text-stone-800">{tab.name}</p>
                  <p className="text-[13px] text-stone-500 mt-0.5">{tab.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Roles It Looks For */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What Roles It Looks For</h2>
          <div className="space-y-3">
            <div>
              <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Titles</p>
              <p className="text-[13px] text-stone-600">
                Director of Operations, Director of Rehabilitation, Director of Clinical Services,
                Director of Patient Services, Director of Quality, Director of Care Coordination,
                VP of Operations, Regional Manager, Program Director, Clinical Operations Manager,
                Senior Manager of Operations
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Location</p>
              <p className="text-[13px] text-stone-600">Remote, NYC (all boroughs), Jersey City, Hoboken</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Excludes</p>
              <p className="text-[13px] text-stone-500">
                Sales, marketing, engineering, finance, HR, pharma/clinical trials,
                treating clinician roles (SLP, PT, OT without leadership scope), MD-required roles
              </p>
            </div>
          </div>
        </section>

        {/* This Week */}
        <section className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-blue-200/60 p-6">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-4">Top Actions This Week</h2>
          <ol className="space-y-3">
            {[
              { text: "Register with B.E. Smith and Clinical Management Consultants", detail: "Free for candidates. They bring director-level healthcare roles to you.", links: [{ label: "besmith.com", url: "https://www.besmith.com/" }, { label: "clinicalmanagementconsultants.com", url: "https://www.clinicalmanagementconsultants.com/" }] },
              { text: "Join ACHE ($160/yr)", detail: "The #1 job board for healthcare executive roles.", links: [{ label: "careers.ache.org", url: "https://careers.ache.org/jobs" }] },
              { text: "Sign up on ANCOR Careers", detail: "IDD leadership roles. Currently lists Director of IDD Services positions.", links: [{ label: "ancor.org/careers", url: "https://www.ancor.org/careers/" }] },
              { text: "Subscribe to Becker's Hospital Review", detail: "Free newsletter covering who's hiring and leadership moves.", links: [{ label: "beckershospitalreview.com", url: "https://www.beckershospitalreview.com/newsletters/" }] },
              { text: "Attend upcoming events", detail: "HLNY FACHE Info Session (Apr 16, NYC) and HealthcareX Jersey City Job Fair (Apr 28, free)." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-stone-800">{item.text}</p>
                  <p className="text-[13px] text-stone-500 mt-0.5">{item.detail}</p>
                  {item.links && (
                    <div className="flex gap-3 mt-1">
                      {item.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium text-blue-600 hover:text-blue-700 hover:underline">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Companies */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">147 Companies Tracked</h2>
          <p className="text-[13px] text-stone-500 mb-4">
            Across 11 categories: Telehealth (40), Rehabilitation (15), IDD (12), SNF Chains (9),
            Health Systems (7), Healthcare Ops (10), Home Health (9), ABA (8), Health Tech (10),
            Nonprofits (10), Staffing (3). New companies are added regularly.
          </p>
          <p className="text-[13px] text-stone-500">
            The system scans at 7 AM ET daily. Only roles matching your profile are shown.
            If a company has zero matching roles, it is hidden from the Companies tab.
          </p>
        </section>
      </div>
    </div>
  );
}
