"use client";

const recruiters = [
  {
    name: "B.E. Smith / AMN Leadership Solutions",
    url: "https://www.besmith.com/",
    specialty: "Ranked #1 healthcare executive search firm. Places Director through C-Suite across acute care, post-acute, and physician practices.",
    whyEmma: "Director-level is their sweet spot. They cover post-acute care settings where Emma's rehab director background is a direct match.",
    action: "Submit candidate profile at besmith.com",
  },
  {
    name: "WittKieffer",
    url: "https://wittkieffer.com/healthcare-search",
    specialty: "Premier healthcare executive recruitment since 1969. Places directors, service line leaders, and assistant VPs.",
    whyEmma: "Explicitly places director-level and service line leaders, not just C-suite. Strong reputation in healthcare.",
    action: "Reach out to consultants via wittkieffer.com",
  },
  {
    name: "Clinical Management Consultants (CMC)",
    url: "https://www.clinicalmanagementconsultants.com/",
    specialty: "Specializes in Director, VP, and C-Suite placements for hospitals and healthcare employers. Both interim and permanent.",
    whyEmma: "Director-level healthcare is their entire business. They understand the clinical-to-ops career path.",
    action: "Register at clinicalmanagementconsultants.com",
  },
  {
    name: "Kirby Bates Associates",
    url: "https://kirbybates.com/",
    specialty: "Healthcare-only executive search. Deep relationships across health systems nationwide.",
    whyEmma: "Healthcare-only firm with strong health system connections. Good for hospital/system ops director roles.",
    action: "Contact via kirbybates.com",
  },
  {
    name: "Korn Ferry (Healthcare Practice)",
    url: "https://www.kornferry.com/",
    specialty: "Global executive search with a dedicated healthcare practice. Data-driven approach to placing senior executives.",
    whyEmma: "Larger firm, more VP+ roles. Worth registering for their healthcare talent pipeline.",
    action: "Create candidate profile at kornferry.com",
  },
  {
    name: "Duffy Group",
    url: "https://duffygroup.com/healthcare/",
    specialty: "25+ years in healthcare executive search. Places CEOs, CFOs, COOs, clinical directors.",
    whyEmma: "Covers director-level clinical and administrative roles across healthcare settings.",
    action: "Contact via duffygroup.com/healthcare",
  },
];

const jobBoards = [
  {
    name: "ACHE Job Center",
    url: "https://www.ache.org/career-resource-center/job-center",
    description: "THE premier job board for healthcare executives. Director and VP-level ops roles.",
    cost: "ACHE membership (~$325/yr)",
  },
  {
    name: "ANCOR Careers",
    url: "https://www.ancor.org/careers/",
    description: "IDD leadership roles. Currently lists Director of IDD Services positions.",
    cost: "Free to browse",
  },
  {
    name: "AAIDD Career Center",
    url: "https://www.aaidd.org/career-center",
    description: "IDD-specific leadership job board from the largest IDD professional association.",
    cost: "Membership (~$175/yr)",
  },
  {
    name: "APTA Career Center",
    url: "https://jobs.apta.org/",
    description: "Lists Director of Rehabilitation roles, not just clinician positions.",
    cost: "Free to search",
  },
  {
    name: "ASHA Career Portal",
    url: "https://careers2.asha.org/",
    description: "SLP/audiology careers including director-level positions in rehab settings.",
    cost: "Free to search",
  },
  {
    name: "Health eCareers",
    url: "https://www.healthecareers.com/",
    description: "Healthcare career hub with administration and executive positions. Free salary calculator.",
    cost: "Free",
  },
  {
    name: "HospitalCareers",
    url: "https://hospitalcareers.com/",
    description: "Partners with 20+ state hospital associations. 17,000+ live jobs.",
    cost: "Free",
  },
  {
    name: "MGMA Career Center",
    url: "https://careers.mgma.com/",
    description: "Medical group management roles. Executive management and practice leadership.",
    cost: "Free to browse",
  },
];

const newsletters = [
  {
    name: "Becker's Hospital Review",
    url: "https://www.beckershospitalreview.com/newsletters/",
    description: "Leadership moves, who's hiring, health system deals. Also has a job board.",
  },
  {
    name: "Hospitalogy",
    url: "https://hospitalogy.com/newsletter-subscription/",
    description: "Healthcare M&A, strategy, and market trends. 42K subscribers. Signals where new director roles will open.",
  },
];

const events = [
  {
    name: "HLNY FACHE Info Session",
    date: "Apr 16, 2026",
    location: "NYC metro",
    url: "https://hlny.org/hlny-events/",
    description: "Learn about FACHE credential pathway. Hosted by Healthcare Leaders of New York (ACHE chapter).",
  },
  {
    name: "HLNY Networking Event",
    date: "Apr 21, 2026",
    location: "NYC metro",
    url: "https://hlny.org/hlny-events/",
    description: "Network with NYC healthcare leaders. ACHE membership recommended.",
  },
  {
    name: "HealthcareX Jersey City Job Fair",
    date: "Apr 28, 2026",
    location: "Jersey City, NJ",
    url: "https://www.healthcarex.co/job-fairs-near-me/new-jersey/jersey-city",
    description: "Free healthcare career fair. Local employers attend. Also runs monthly through October.",
  },
  {
    name: "NY MGMA Annual Conference",
    date: "Jun 7-8, 2026",
    location: "Verona, NY",
    url: "https://www.newyorkmgma.com/2026AnnualConference",
    description: "Medical group management. Operations-specific networking with practice leaders.",
  },
  {
    name: "NJHA Best at the Beach",
    date: "Jul 11, 2026",
    location: "Long Branch, NJ",
    url: "https://education.njha.com/events",
    description: "NJ hospital executives networking event. The summer's premier NJ healthcare gathering.",
  },
  {
    name: "Northwell Health Recruitment Sessions",
    date: "Recurring",
    location: "Virtual",
    url: "https://jobs.northwell.edu/events-main/",
    description: "Get to Know Northwell sessions. Largest private employer in NY. Check for ops/management roles.",
  },
];

const communities = [
  {
    name: "Healthcare Pulse (Slack)",
    url: "https://www.manifold.group/what-we-do/healthcare-pulse-community",
    description: "Invite-only Slack for healthcare executives. Peer networking with other leaders.",
  },
  {
    name: "CareOps Community (Slack)",
    url: "https://www.careops.org/careops-community",
    description: "Clinical operations, process improvement, and care delivery. Virtual sessions and meetups.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          Resources
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          Recruiters, job boards, newsletters, and communities for healthcare ops leaders
        </p>
      </div>

      {/* Recruiters */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold text-stone-800 mb-4">
          Executive Recruiters
        </h2>
        <p className="text-[13px] text-stone-500 mb-4">
          All free for candidates. Register to let them bring roles to you.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {recruiters.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-[14px] text-stone-800">
                  {r.name}
                </h3>
              </div>
              <p className="text-[13px] text-stone-600 mb-2">{r.specialty}</p>
              <p className="text-[13px] text-stone-500 italic mb-3">
                {r.whyEmma}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-stone-400">{r.action}</span>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700"
                >
                  Visit site
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Boards */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold text-stone-800 mb-4">
          Job Boards
        </h2>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Board
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {jobBoards.map((b, i) => (
                <tr
                  key={b.name}
                  className={
                    i < jobBoards.length - 1
                      ? "border-b border-stone-50"
                      : ""
                  }
                >
                  <td className="px-4 py-3.5">
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {b.name}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-stone-600">
                    {b.description}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-stone-500">
                    {b.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Newsletters */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold text-stone-800 mb-4">
          Newsletters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {newsletters.map((n) => (
            <div
              key={n.name}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
            >
              <h3 className="font-semibold text-[14px] text-stone-800 mb-1.5">
                {n.name}
              </h3>
              <p className="text-[13px] text-stone-600 mb-3">
                {n.description}
              </p>
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700"
              >
                Subscribe (free)
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold text-stone-800 mb-4">
          Upcoming Events
        </h2>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Event</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={e.name} className={i < events.length - 1 ? "border-b border-stone-50" : ""}>
                  <td className="px-4 py-3.5">
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      {e.name}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-stone-700 font-medium whitespace-nowrap">{e.date}</td>
                  <td className="px-4 py-3.5 text-[13px] text-stone-500 whitespace-nowrap">{e.location}</td>
                  <td className="px-4 py-3.5 text-[13px] text-stone-500">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Communities */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold text-stone-800 mb-4">
          Communities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {communities.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
            >
              <h3 className="font-semibold text-[14px] text-stone-800 mb-1.5">
                {c.name}
              </h3>
              <p className="text-[13px] text-stone-600 mb-3">
                {c.description}
              </p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700"
              >
                Join
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
