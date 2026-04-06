"use client";

const hiringSignals = [
  {
    company: "NYC Health + Hospitals",
    signal: "New COO appointed at Woodhull (March 2026). New COOs rebuild their director-level teams.",
    contact: "Clifford Miller, new COO at Woodhull",
    action: "Monitor for Director of Operations openings in the coming weeks",
    urgency: "high" as const,
  },
  {
    company: "RWJBarnabas Health",
    signal: "Building new 67,000 sqft multi-specialty center in Howell (late 2026). Acquiring Englewood Health with $500M commitment.",
    contact: "Check executive leadership page for VP Operations",
    action: "Two simultaneous expansions = multiple director-level ops roles opening",
    urgency: "high" as const,
  },
  {
    company: "Northwell Health",
    signal: "EVP/COO Mark Solazzo retiring. Replacement will reshape ops leadership team. Director of Operations posted on LinkedIn (Staten Island).",
    contact: "New COO (TBD) will be building their team",
    action: "Apply to Director, Operations posting. Watch for more roles as new COO settles in",
    urgency: "high" as const,
  },
  {
    company: "YAI",
    signal: "In leadership transition after CEO's passing. New leadership = new hires across the org.",
    contact: "New executive team TBD",
    action: "Network in via IDD professional associations (ANCOR, AAIDD). Watch Workday portal",
    urgency: "high" as const,
  },
  {
    company: "AHRC New York City",
    signal: "COO position was recently open. Whoever fills it will be building their ops team.",
    contact: "New COO (once hired)",
    action: "Monitor SmartRecruiters portal for Program Director and Director of Operations roles",
    urgency: "medium" as const,
  },
  {
    company: "SportsMed Physical Therapy",
    signal: "PE-backed (Hildred Capital), grew from 7 to 54 NJ clinics. 68 open positions. 2026 PT Company of Year. Acquired 2 CT clinics in March 2026.",
    contact: "Executive team via LinkedIn",
    action: "Reach out directly — rapid growth at this scale needs ops standardization leadership",
    urgency: "high" as const,
  },
  {
    company: "Professional Physical Therapy",
    signal: "PE-backed (THL Partners), 100+ NJ/NY/CT locations. 8 acquisitions completed. Largest independent PT footprint in the Northeast.",
    contact: "Executive team via LinkedIn",
    action: "Multi-site integration is exactly the ops challenge Emma has solved before",
    urgency: "medium" as const,
  },
  {
    company: "Aegis Therapies + Broad River Rehab",
    signal: "Merged February 2026 to form top-5 US contract rehab provider. 6,500 employees, 775 facilities, 45+ states.",
    contact: "Regional leadership via LinkedIn",
    action: "Post-merger integration creates Regional Director and ops leadership roles. Monitor careers page",
    urgency: "high" as const,
  },
  {
    company: "Beacon Behavioral Partners",
    signal: "PE-backed, acquired 18+ practices including Synapse (NJ). Hired 5 senior leaders in Jan 2026 (ops, strategy, marketing, compliance, rev cycle).",
    contact: "New senior ops leadership team",
    action: "They just built out senior leadership — next wave is director-level. NJ presence through Synapse",
    urgency: "medium" as const,
  },
  {
    company: "Encompass Health",
    signal: "Opening 3 new inpatient rehab hospitals in the Northeast in 2026 (PA/DE). New regional president named.",
    contact: "Mathew Gooch, Northeast Regional President",
    action: "New hospitals = new Directors of Rehab. Reach out to regional office proactively",
    urgency: "medium" as const,
  },
  {
    company: "Tryko / Marquis Health Services",
    signal: "NJ-based, recently acquired 2 SNFs from Virtua Health (Berlin and Mount Holly, NJ). Active acquirer with 4,500+ beds.",
    contact: "Leadership team via mqshealth.com",
    action: "Each acquisition triggers rehab leadership hiring. Watch for DOR postings at newly acquired facilities",
    urgency: "medium" as const,
  },
  {
    company: "Spring Health",
    signal: "VP Clinical Operations role actively posted (Remote). Multiple director-level ops roles open simultaneously.",
    contact: "Clinical operations leadership via LinkedIn",
    action: "Apply to Director, Clinical Operations (Remote) — posted and active",
    urgency: "high" as const,
  },
  {
    company: "Charlie Health",
    signal: "No public COO. Large behavioral health company with 1,600 employees and no clear ops leader.",
    contact: "CEO's office directly",
    action: "Reach out for informational interview — they may be looking to create the role",
    urgency: "low" as const,
  },
  {
    company: "University Hospital Newark",
    signal: "Major expansion — new medical office building construction begins 2026. NJ's only Level I trauma center.",
    contact: "Hospital administration",
    action: "New buildings need new directors. Monitor for ops leadership postings",
    urgency: "medium" as const,
  },
];

const urgencyStyles = {
  high: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200", label: "Act now" },
  medium: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", label: "Monitor" },
  low: { bg: "bg-stone-50", text: "text-stone-500", ring: "ring-stone-200", label: "Long-term" },
};

export default function LeadsPage() {
  const highCount = hiringSignals.filter((s) => s.urgency === "high").length;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          Hiring Signals
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          {hiringSignals.length} companies with active hiring signals. {highCount} require immediate action.
        </p>
      </div>

      <div className="space-y-3">
        {hiringSignals.map((item) => {
          const style = urgencyStyles[item.urgency];
          return (
            <div
              key={item.company}
              className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-[15px] text-stone-800">{item.company}</h3>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-md text-[11px] font-medium ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}>
                    {style.label}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Signal</p>
                    <p className="text-[13px] text-stone-600 leading-relaxed">{item.signal}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Who to contact</p>
                    <p className="text-[13px] text-stone-600">{item.contact}</p>
                  </div>

                  <div className={`rounded-lg p-3 ${style.bg}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${style.text}" style={{ color: "inherit" }}>Recommended action</p>
                    <p className="text-[13px] font-medium" style={{ color: "inherit" }}>{item.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
