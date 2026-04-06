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

        {/* The Fit Score */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-3">What the Fit Score Means</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-4">
            Each role has a Fit score from 60 to 100 in the table. This is a number that represents how
            well the role matches your specific background. Higher is better.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-10 text-center text-[15px] font-bold text-emerald-600 mt-0.5">80+</span>
              <div>
                <p className="text-[14px] font-medium text-stone-800">Strong match</p>
                <p className="text-[13px] text-stone-500">Title, industry, and location are all a great fit for your background. Apply to these first.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-10 text-center text-[15px] font-bold text-blue-600 mt-0.5">70-79</span>
              <div>
                <p className="text-[14px] font-medium text-stone-800">Good match</p>
                <p className="text-[13px] text-stone-500">Worth reviewing. May be a slightly different setting or title than your ideal role, but still relevant.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-10 text-center text-[15px] font-bold text-stone-400 mt-0.5">60-69</span>
              <div>
                <p className="text-[14px] font-medium text-stone-800">Possible match</p>
                <p className="text-[13px] text-stone-500">Meets the minimum criteria but may not be as strong a fit. Read the job description carefully before applying.</p>
              </div>
            </div>
          </div>
          <p className="text-[13px] text-stone-400 mt-4">
            The score is calculated based on: how closely the title matches your target roles (e.g., &ldquo;Director of Rehabilitation&rdquo; scores higher than &ldquo;Director of Operations&rdquo;),
            whether the company is in your target industry (rehab, IDD, behavioral health get bonus points),
            and how close the location is to Jersey City.
          </p>
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
        {/* Full Company List */}
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-stone-800 mb-4">All 147 Monitored Companies</h2>
          <p className="text-[14px] text-stone-600 leading-relaxed mb-5">
            These companies are checked every day for new director-level healthcare operations roles.
            Companies are organized by category.
          </p>
          <CompanyDirectory />
        </section>
      </div>
    </div>
  );
}

const companyData: Record<string, string[]> = {
  "Telehealth / Virtual Care": ["Expressable","Presence Learning","Sprout Therapy Group","Great Speech","Better Speech","CORA Physical Therapy","Hazel Health","VocoVision","TinyEYE","Parallel Learning","Huddle Up Care","eLuma","Stepping Stones Group","3Y Health","Talkiatry","Brightline","Rula","NOCD","Charlie Health","InStride Health","AnswersNow","Cortica","Spring Health","Tava Health","Headspace","Cerebral","Teladoc Health","Amwell","MDLIVE","K Health","Hims & Hers Health","Two Chairs","Grow Therapy","Thriveworks","LifeStance Health","AbleTo","Quartet Health","Talkspace","Ro","Bicycle Health","Beacon Behavioral Partners"],
  "Rehabilitation": ["Select Medical / Kessler","Encompass Health","Powerback Rehabilitation","Enhance Therapies","ScionHealth","PAM Health","ProMedica","BrightSpring Health Services","HealthPRO Heritage","Aegis Therapies","Therapy Management Corp","Functional Pathways","FOX Rehabilitation","Quality Rehab Management","Ivy Rehab Network","JAG Physical Therapy","Sigma Health Rehab","Trinity Rehab","EmpowerMe Wellness","SportsMed Physical Therapy","Professional Physical Therapy"],
  "IDD / Developmental Disabilities": ["The Jewish Board","YAI","AHRC New York City","NJ Institute for Disabilities","Oaks Integrated Care","The Arc of New Jersey","Community Options","Bancroft","Elwyn","Devereux Advanced Behavioral Health","Spectrum360","Services for the UnderServed","Helen Keller Services"],
  "Skilled Nursing Facilities": ["Centers Health Care","CareOne","Genesis HealthCare","Portopiccolo Group","Marquis Health Services","Alaris Health","MJHS Health System","ArchCare","Complete Care","CenterLight Health System","Epic Healthcare Management","Bergen New Bridge Medical Center","RiverSpring Living"],
  "Health Systems": ["Hackensack Meridian Health","RWJBarnabas Health","Northwell Health","NewYork-Presbyterian","Montefiore Health System","Mount Sinai Health System","NYC Health + Hospitals","AtlantiCare"],
  "Healthcare Ops / Value-Based Care": ["Headway","Alma","Lyra Health","Included Health","Evolent Health","Agilon Health","Cityblock Health","Molina Healthcare","MPOWERHealth","US Pediatric Partners"],
  "Home Health / Hospice": ["VNS Health","BAYADA Home Health Care","Aveanna Healthcare","Amedisys","Enhabit Home Health & Hospice","Addus HomeCare","LHC Group","CareBridge / Elevance Health","ConcertoCare"],
  "ABA / Autism Providers": ["Action Behavior Centers","Hopebridge","InBloom Autism Services","LEARN Behavioral","BlueSprig Autism","Trumpet Behavioral Health","Centria Autism","Bierman Autism Centers"],
  "Health Tech / Clinical Ops": ["Devoted Health","Clover Health","Oscar Health","Noom","Omada Health","Hinge Health","Sword Health","Virta Health","Wondr Health","WellSky","Clipboard Health"],
  "Healthcare Nonprofits": ["Catholic Charities NY","HeartShare Human Services","SCO Family of Services","Childrens Aid Society","Rutgers UBHC","Community Healthcare Network","Ryan Health","Metropolitan Family Health Network","Henry Street Settlement","Good Shepherd Services"],
  "Healthcare Staffing": ["AMN Healthcare","Cross Country Healthcare","Soliant Health"],
};

function CompanyDirectory() {
  return (
    <div className="space-y-5">
      {Object.entries(companyData).map(([category, companies]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[13px] font-semibold text-stone-700">{category}</h3>
            <span className="text-[11px] text-stone-400">({companies.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {companies.map((name) => (
              <span
                key={name}
                className="px-2.5 py-1 rounded-md text-[12px] bg-stone-50 text-stone-600 border border-stone-100"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
