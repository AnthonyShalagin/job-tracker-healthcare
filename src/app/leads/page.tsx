"use client";

interface Lead {
  company: string;
  tier: "apply" | "signal" | "outreach";
  contact: string;
  title: string;
  linkedin?: string;
  email?: string;
  source: string;
  signal: string;
  outreachAngle: string;
  activeRole?: string;
  activeRoleUrl?: string;
}

const leads: Lead[] = [
  // TIER 1: Active openings with identified hiring managers
  {
    company: "NYC Health + Hospitals / Woodhull",
    tier: "apply",
    contact: "Clifford Miller",
    title: "Chief Operating Officer (appointed March 30, 2026)",
    linkedin: "https://www.linkedin.com/in/clifford-miller-b10993124/",
    email: "clifford.miller@nychhc.org",
    source: "NYC H+H press release",
    signal: "Appointed COO less than 1 week ago. Building his leadership team RIGHT NOW.",
    outreachAngle: "Congratulate on the appointment. Reference his Brooklyn Power List recognition. He needs directors to build his team — timing is everything.",
    activeRole: "Director-level ops roles incoming",
  },
  {
    company: "Montefiore Health System",
    tier: "apply",
    contact: "Jeff Short",
    title: "Chief Transformation Officer & Chief Exec, Faculty Practice Group",
    linkedin: "https://www.linkedin.com/in/jeff-short-7b0a756",
    email: "jshort@montefiore.org",
    source: "Montefiore leadership page + Becker's recognition",
    signal: "Manages 2,000 physicians, 5,000 employees, 70 locations, 1.9M visits/yr. Active Director of Practice Operations posting ($112-150K).",
    outreachAngle: "Reference his Becker's Top Transformation Officer 2022 recognition. The scale of ambulatory operations he oversees maps to your 100+ staff management experience.",
    activeRole: "Director, Practice Operations",
    activeRoleUrl: "https://careers.montefiore.org/job/BRONX-DIRECTOR-PRACTICE-OPERATIONS-NY/1225966000/",
  },
  {
    company: "Spring Health",
    tier: "apply",
    contact: "Arielle Mortimer",
    title: "Chief Operating Officer",
    linkedin: "https://www.linkedin.com/in/arielle-mortimer/",
    email: "arielle.mortimer@springhealth.com",
    source: "Spring Health press release + LinkedIn",
    signal: "COO owns full ops org. Multiple director-level ops roles posted (Clinical Ops, Strategic Ops, Business Ops).",
    outreachAngle: "Reference her background scaling operations at Kindbody and Heyday. Your experience scaling a $9MM program at Jewish Board is a direct parallel.",
    activeRole: "Director, Clinical Operations (Remote)",
  },
  {
    company: "VNS Health",
    tier: "apply",
    contact: "Brenda Riordan",
    title: "SVP, Home Health Care and Care Management Solutions",
    linkedin: "Search: Brenda Riordan VNS Health",
    email: "brenda.riordan@vnshealth.org",
    source: "VNS Health press release (joined July 2024)",
    signal: "OT by training — clinical kinship with SLP background. Building care management leadership team. Multiple director roles open.",
    outreachAngle: "Reference her OT background from Boston University — shared clinical-to-ops career path. She joined from Encompass Health and is building her team.",
    activeRole: "Director, Care Management + Director, Utilization Management ($122-164K)",
  },
  {
    company: "Headway",
    tier: "apply",
    contact: "Rob Sadow",
    title: "VP Operations & Strategy",
    linkedin: "https://www.linkedin.com/in/rob-sadow/",
    email: "rob.sadow@headway.co",
    source: "Headway blog post (March 2025)",
    signal: "Brand new to role, building ops org at $1B+ mental health company. Owns Operations, Finance, Legal, Compliance, Clinical.",
    outreachAngle: "Former Bain Manager and CEO of Scoop. Reference the mental health access mission and your experience scaling clinical operations.",
    activeRole: "Director, Business Operations (Remote)",
  },
  {
    company: "Hackensack Meridian Health",
    tier: "apply",
    contact: "Regina M. Foley, PhD, MBA, RN",
    title: "President, Specialty Hospitals and Clinical Services (NEW ROLE created May 2025)",
    linkedin: "https://www.linkedin.com/in/regina-foley/",
    email: "regina.foley@hackensackmeridian.org",
    source: "HMH leadership restructure announcement (May 2025)",
    signal: "Newly created role overseeing Johnson Rehabilitation Institute, Carrier Clinic, LTACH, nursing, rehab, pharmacy. Building from scratch. Modern Healthcare Top 25 Women Leaders 2023.",
    outreachAngle: "Reference her Top 25 Women Leaders recognition. She's a clinician-turned-executive (35+ years) — same career arc. Your rehab director background maps perfectly to Johnson Rehab Institute.",
  },

  // TIER 2: Expansion signals
  {
    company: "RWJBarnabas Health",
    tier: "signal",
    contact: "John Doll",
    title: "Senior EVP & Chief Operating Officer",
    linkedin: "https://www.linkedin.com/in/john-doll-70393517/",
    email: "john.doll@rwjbh.org",
    source: "Becker's 2025 COO recognition + ROI-NJ Healthcare Influencer 2024",
    signal: "Building new 67,000 sqft facility in Howell NJ + acquiring Englewood Hospital ($500M). Two simultaneous expansions = multiple director-level ops roles.",
    outreachAngle: "Congratulate on Becker's Academic Medical Center COO to Know 2025. Reference the Howell facility steel beam milestone (Feb 2026). Massive expansion needs ops leadership.",
  },
  {
    company: "SportsMed Physical Therapy",
    tier: "signal",
    contact: "Mario Cala",
    title: "Executive Vice President of Operations",
    linkedin: "https://www.linkedin.com/in/marioacala/",
    email: "mcala@spineandsportsmed.com",
    source: "SportsMed leadership page + ZoomInfo",
    signal: "PE-backed (Hildred Capital). Grew 7 to 54 NJ clinics. Just acquired CT clinics. 68 open positions. 2026 PT Company of Year.",
    outreachAngle: "He describes himself as 'Healthcare Executive; M&A; Business Operations; Private Equity.' Rapid M&A needs ops integration — exactly your Signify Health and Nuance/Microsoft skillset.",
  },
  {
    company: "Aegis Therapies",
    tier: "signal",
    contact: "Martha Schram",
    title: "President & CEO",
    linkedin: "https://www.linkedin.com/in/martha-schram-9b533616/",
    email: "martha.schram@aegistherapies.com",
    source: "Merger announcement (Feb 2026)",
    signal: "Merged with Broad River Rehab — now top-5 US contract rehab (6,500 employees, 775 facilities, 45+ states). Post-merger integration creates ops leadership roles.",
    outreachAngle: "Reference the merger and the need for Northeast operational leadership. Her career is dedicated to geriatrics — your SNF/rehab background at Haym Salomon is directly relevant.",
  },
  {
    company: "YAI",
    tier: "signal",
    contact: "Gary Milchman",
    title: "Acting CEO (formerly Chief Program Officer)",
    linkedin: "https://www.linkedin.com/in/gary-milchman-edm-8a9857121/",
    email: "gary.milchman@yai.org",
    source: "YAI press release on CEO transition",
    signal: "Assumed Acting CEO after Kevin Carey's passing (June 2025). 20+ years at YAI overseeing Residential and Day Services for IDD. Reshaping leadership team.",
    outreachAngle: "Be sensitive about the transition. Reference shared IDD mission. Your IDD program leadership at Jewish Board ($9MM budget, 100+ staff) is a near-perfect match.",
  },
  {
    company: "Northwell Health",
    tier: "signal",
    contact: "Jon Sendach",
    title: "EVP & President, Central Market (newly appointed)",
    source: "Northwell leadership page",
    signal: "COO Mark Solazzo retired end of 2025. COO function restructured into market presidents. New role = building a team.",
    outreachAngle: "Newly appointed to oversee clinical and financial operations in the central market. New leadership structure means new director-level hires.",
    activeRole: "Director, Operations (Staten Island) posted on LinkedIn",
  },

  // TIER 3: Proactive outreach
  {
    company: "Select Medical / Kessler",
    tier: "outreach",
    contact: "Patricia (Pat) Judd",
    title: "VP of Outpatient Clinical Operations",
    linkedin: "https://www.linkedin.com/in/patricia-judd-17358813",
    email: "patricia.judd@kessler-rehab.com",
    source: "Kessler leadership page",
    signal: "Oversees 100+ Kessler outpatient clinics + 4 hospital campuses. PT by training, started at Kessler in 1989. Rutgers + Seton Hall degrees.",
    outreachAngle: "Clinician-turned-exec (same path). Reference Kessler's clinical excellence reputation and the scale of NJ operations.",
  },
  {
    company: "Centers Health Care",
    tier: "outreach",
    contact: "Amir Abramchik",
    title: "Chief Operating Officer (16+ years at Centers)",
    linkedin: "https://www.linkedin.com/in/amir-abramchik-a301a735/",
    email: "amir.abramchik@centershealthcare.com",
    source: "Centers Health Care leadership page",
    signal: "Oversees 45 SNFs across the Northeast — largest post-acute care continuum in the region. Started in Home Care in 1999 when Centers was a startup.",
    outreachAngle: "Your SNF experience at Haym Salomon combined with healthcare ops scale at Nuance/Microsoft is a strong fit for their 45-facility network.",
  },
  {
    company: "CareOne",
    tier: "outreach",
    contact: "Grant Welson, MBA, MPT, LNHA",
    title: "CEO, CareOne Hospital Division (former VP Rehab Operations)",
    linkedin: "https://www.linkedin.com/in/grantwelson/",
    email: "grant.welson@care-one.com",
    source: "LinkedIn + ZoomInfo",
    signal: "Physical Therapist by training (U of Delaware) with MBA (Baruch). Directed rehab operations across 49 SNF/ALF locations before promotion. Clinician-turned-exec.",
    outreachAngle: "Shared clinical-to-operations career arc. Reference CareOne's 50+ NJ facility footprint. He'll understand the SLP-to-ops path.",
  },
  {
    company: "Included Health",
    tier: "apply",
    contact: "Nupur Srivastava",
    title: "Chief Operating Officer",
    linkedin: "https://www.linkedin.com/in/nupursrivastava/",
    email: "nupur.srivastava@includedhealth.com",
    source: "Included Health About Us page + LinkedIn",
    signal: "10+ years at Included Health. Stanford MBA. SF Business Times 40 Under 40. Active Director of Staffing Operations posting.",
    outreachAngle: "Reference her long tenure building the company. Your operational scaling experience across clinical and tech settings matches the integrated care model.",
    activeRole: "Director, Staffing Operations & Vendor Management (Remote)",
  },
];

const tierConfig = {
  apply: { label: "Active Role — Apply Now", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  signal: { label: "Hiring Signal — Reach Out", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  outreach: { label: "Proactive — Build Relationship", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
};

export default function LeadsPage() {
  const applyCount = leads.filter((l) => l.tier === "apply").length;
  const signalCount = leads.filter((l) => l.tier === "signal").length;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          Hiring Leads
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          {leads.length} contacts at target companies. {applyCount} with active roles, {signalCount} with hiring signals.
        </p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => {
          const tier = tierConfig[lead.tier];
          return (
            <div
              key={lead.company + lead.contact}
              className={`bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-[15px] text-stone-800">{lead.company}</h3>
                    <p className="text-[13px] text-stone-500 mt-0.5">{lead.contact} — {lead.title}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium ${tier.bg} ${tier.text} border ${tier.border}`}>
                    {tier.label}
                  </span>
                </div>

                {/* Active role link */}
                {lead.activeRole && (
                  <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">Open Role</p>
                    {lead.activeRoleUrl ? (
                      <a href={lead.activeRoleUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-emerald-700 hover:underline">
                        {lead.activeRole}
                      </a>
                    ) : (
                      <p className="text-[13px] font-medium text-emerald-700">{lead.activeRole}</p>
                    )}
                  </div>
                )}

                {/* Signal */}
                <div className="mb-3">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Why Now</p>
                  <p className="text-[13px] text-stone-600 leading-relaxed">{lead.signal}</p>
                </div>

                {/* Outreach angle */}
                <div className="mb-4 p-3 bg-stone-50 rounded-lg">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">What to Say</p>
                  <p className="text-[13px] text-stone-600 leading-relaxed italic">{lead.outreachAngle}</p>
                </div>

                {/* Contact links */}
                <div className="flex items-center gap-4 text-[12px]">
                  {lead.linkedin && (
                    <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 font-medium text-stone-500 hover:text-stone-700">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {lead.email}
                    </a>
                  )}
                  <span className="text-stone-400">Source: {lead.source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
