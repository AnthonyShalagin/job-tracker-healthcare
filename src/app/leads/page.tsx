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
  // TIER 1: Active openings — VP/Director-level hiring managers
  {
    company: "VNS Health",
    tier: "apply",
    contact: "Esther Kamara-Conteh",
    title: "VP, Care Management Operations (Health Plans)",
    linkedin: "https://www.linkedin.com/in/esther-kamara-conteh-3b72a717",
    email: "esther.kamara-conteh@vnshealth.org",
    source: "McKnight's Pinnacle Award announcement",
    signal: "Won 2024 McKnight's Pinnacle Award. Oversees teams serving 35,000 members. Director of Care Management reports directly to her.",
    outreachAngle: "\"Congratulations on your McKnight's Pinnacle Award.\" She immigrated from Sierra Leone, started as a home health aide, advanced to VP — she'll appreciate the clinical-to-ops career path.",
    activeRole: "Director, Care Management + Director, Utilization Management ($122-164K)",
    activeRoleUrl: "https://jobs.vnshealth.org/careers-home/jobs/3394?lang=en-us",
  },
  {
    company: "Montefiore Health System",
    tier: "apply",
    contact: "Giuseppe Siena",
    title: "Vice President, Montefiore Medical Group",
    linkedin: "https://www.linkedin.com/in/giuseppe-siena-1086977/",
    email: "gsiena@montefiore.org",
    source: "Montefiore leadership page",
    signal: "Runs ambulatory/practice operations. Director of Practice Operations ($112-150K) reports to him or his direct reports. 70 locations, 1.9M visits/yr.",
    outreachAngle: "Reference the scale of ambulatory operations — your 100+ staff and multi-site management experience is directly relevant.",
    activeRole: "Director, Practice Operations ($112-150K)",
    activeRoleUrl: "https://careers.montefiore.org/job/BRONX-DIRECTOR-PRACTICE-OPERATIONS-NY/1225966000/",
  },
  {
    company: "Headway",
    tier: "apply",
    contact: "Rob Sadow",
    title: "VP, Head of Operations & Strategy",
    linkedin: "https://www.linkedin.com/in/rob-sadow/",
    email: "rob.sadow@headway.co",
    source: "Headway blog (Feb 2025)",
    signal: "IS the direct hiring manager. Owns Operations, Finance, Legal, Compliance, Clinical. Building brand-new ops org at $1B+ mental health company.",
    outreachAngle: "Former Bain Manager and CEO of Scoop. He joined Headway in Feb 2025 — reference the mental health access mission.",
    activeRole: "Director, Business Operations (Remote)",
  },
  {
    company: "Rula",
    tier: "apply",
    contact: "Sam Seiniger",
    title: "VP, Clinical Operations",
    linkedin: "https://www.linkedin.com/in/sam-seiniger-035234b0/",
    email: "sam.seiniger@rula.com",
    source: "LinkedIn",
    signal: "VP of Clinical Operations is the direct manager of the Clinical Operations Manager role. Rula has 60K+ therapists on platform.",
    outreachAngle: "Direct hiring manager. Reference the clinical ops challenge of managing a network of 60K+ therapists — your experience managing 150+ ops staff at Nuance/Microsoft is relevant.",
    activeRole: "Clinical Operations Manager (Remote)",
  },
  {
    company: "Spring Health",
    tier: "apply",
    contact: "VP, Care Operations (may be recently filled)",
    title: "VP, Care Operations — the Director of Clinical Ops reports to this role",
    linkedin: "https://www.linkedin.com/jobs/view/vp-care-operations-at-spring-health-3930191825",
    email: "arielle.mortimer@springhealth.com",
    source: "Spring Health LinkedIn job posting",
    signal: "VP Care Operations was also posted — the direct manager for the Director role. If filled, that person is the hiring manager. Arielle Mortimer (COO) is fallback.",
    outreachAngle: "Multiple ops roles open simultaneously signals a major buildout. Reference scaling a $9MM program — direct parallel to their growth stage.",
    activeRole: "Director, Clinical Operations (Remote) + 5 other ops director roles",
  },
  {
    company: "Bicycle Health",
    tier: "apply",
    contact: "Amy Finney",
    title: "Chief Operating Officer (former VP Operations, One Medical)",
    email: "amy.finney@bicyclehealth.com",
    source: "LinkedIn / company leadership",
    signal: "No VP of Ops below her — Regional Operations Director reports directly to COO. She led COVID-19 testing ops at One Medical nationally. Berkeley Haas MBA.",
    outreachAngle: "She's a clinician-friendly ops leader from One Medical. Reference the opioid care mission and your value-based care experience at Signify Health.",
    activeRole: "Regional Operations Director (Remote)",
  },

  // TIER 2: Hiring signals — VP/Director hiring managers
  {
    company: "Hackensack Meridian Health",
    tier: "signal",
    contact: "Anthony Cuzzola",
    title: "VP & Administrator, Rehabilitation Care Transformation Services / JFK Johnson Rehab Institute",
    linkedin: "https://www.linkedin.com/in/anthony-cuzzola-7301a2262/",
    email: "anthony.cuzzola@hmhn.org",
    source: "HMH leadership restructure (May 2025)",
    signal: "Reports to Regina Foley (President, Specialty Hospitals). VP of the rehab division — would be the hiring manager for any Director of Rehabilitation or Director of Clinical Operations in rehab.",
    outreachAngle: "Your Director of Rehab experience at Haym Salomon maps directly to JFK Johnson Rehab Institute. Reference the rehab care transformation mission.",
  },
  {
    company: "SportsMed Physical Therapy",
    tier: "signal",
    contact: "David Hotaling, DPT",
    title: "Vice President of Operations",
    linkedin: "https://www.linkedin.com/in/hotalingpt/",
    email: "d.hotaling@spineandsportsmed.com",
    source: "SportsMed leadership page + ZoomInfo",
    signal: "DPT from Touro College. Former Regional Director at Prostaff PT. Clinician-turned-executive. Leads ops for 600+ employees across 45+ NJ/CT clinics.",
    outreachAngle: "Shared clinician-to-ops path (he's a DPT). PE-backed rapid growth (7 to 54 clinics) needs ops integration — exactly your skillset.",
  },
  {
    company: "RWJBarnabas Health",
    tier: "signal",
    contact: "Judy Lane, MHA, BSN, RN, SCRN",
    title: "SVP Operations, Southern Region",
    linkedin: "https://www.linkedin.com/in/judy-lane-36a9903a/",
    email: "judy.lane@rwjbh.org",
    source: "RWJBH leadership announcement (June 2024)",
    signal: "Rose from bedside nurse through Director of Neurology, AVP Clinical Operations to SVP. Two massive expansions: Howell facility + Englewood acquisition.",
    outreachAngle: "Clinician-turned-executive (nurse to SVP). Reference the Howell construction milestone. She'll understand the clinical-to-ops career arc.",
  },
  {
    company: "Select Medical / Kessler",
    tier: "signal",
    contact: "Sam Bayoumy",
    title: "President, Kessler Institute for Rehabilitation (former VP Operations)",
    linkedin: "https://www.linkedin.com/in/sam-bayoumy-322b0785/",
    email: "sam.bayoumy@kessler-rehab.com",
    source: "Kessler leadership page",
    signal: "Previously held the VP of Operations role at Kessler — that seat may now be vacant below him. Oversees all inpatient rehab across 4 NJ campuses.",
    outreachAngle: "His former VP of Ops role may be open. Reference Kessler's NJ rehab reputation and your Director of Rehab experience.",
  },
  {
    company: "NYC Health + Hospitals",
    tier: "signal",
    contact: "Sewit Teckie, MD, MBA",
    title: "VP, Office of Enterprise Clinical Operations (appointed Nov 2025)",
    email: "teckies@nychhc.org",
    source: "NYC H+H press release",
    signal: "New role (Nov 2025) leading Enterprise Clinical Operations: affiliations, provider staffing, credentialing, shared clinical services. Harvard College + Harvard Medical School.",
    outreachAngle: "Newly appointed — building her team. Director-level ops roles across the system fall under her office.",
  },
  {
    company: "CareOne",
    tier: "outreach",
    contact: "Grant Welson, MBA, MPT, LNHA",
    title: "CEO, Hospital Division / Former Chief Rehabilitation and Clinical Operations Officer",
    linkedin: "https://www.linkedin.com/in/grantwelson/",
    email: "grant.welson@care-one.com",
    source: "LinkedIn + ZoomInfo",
    signal: "Physical Therapist (U of Delaware) with MBA (Baruch). Directed rehab across 49 SNF/ALF locations before promotion. Clinician-turned-exec — same career path.",
    outreachAngle: "Shared PT/SLP-to-ops path. He'll understand exactly what a CCC-SLP brings to ops leadership. 50+ NJ facilities.",
  },
  {
    company: "Northwell Health",
    tier: "outreach",
    contact: "Andrea Bianculli",
    title: "VP, Ambulatory Operations, Behavioral Health Service Line",
    linkedin: "https://www.linkedin.com/in/andreabianculli/",
    email: "abianculli@northwell.edu",
    source: "LinkedIn",
    signal: "VP Ambulatory Operations for Behavioral Health. A Director of Operations in the behavioral health ambulatory space reports to her.",
    outreachAngle: "Your IDD/behavioral health program director experience at Jewish Board is directly relevant to Northwell's behavioral health service line.",
  },
  {
    company: "Centers Health Care",
    tier: "outreach",
    contact: "Aharon Lantzitsky",
    title: "Division President",
    linkedin: "https://www.linkedin.com/in/aharon-lantzitsky-26a52821/",
    email: "alantzitsky@centersbusiness.org",
    source: "Centers Health Care leadership page + ZoomInfo",
    signal: "Division President overseeing a group of Centers facilities (45 SNFs across Northeast). A Regional Director of Operations would report to him.",
    outreachAngle: "Your SNF experience at Haym Salomon combined with healthcare ops scale at Nuance/Microsoft fits their 45-facility network.",
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
          {leads.length} VP/Director-level hiring managers at target companies. {applyCount} with active roles, {signalCount} with hiring signals.
        </p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => {
          const tier = tierConfig[lead.tier];
          return (
            <div key={lead.company + lead.contact} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-[15px] text-stone-800">{lead.company}</h3>
                    <p className="text-[13px] text-stone-600 mt-0.5">{lead.contact} — {lead.title}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium ${tier.bg} ${tier.text} border ${tier.border}`}>
                    {tier.label}
                  </span>
                </div>

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

                <div className="mb-3">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Why Now</p>
                  <p className="text-[13px] text-stone-600 leading-relaxed">{lead.signal}</p>
                </div>

                <div className="mb-4 p-3 bg-stone-50 rounded-lg">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">What to Say</p>
                  <p className="text-[13px] text-stone-600 leading-relaxed italic">{lead.outreachAngle}</p>
                </div>

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
