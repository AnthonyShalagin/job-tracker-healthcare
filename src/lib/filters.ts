// Keywords that signal the role is in Emma's target domain
const DOMAIN_KEYWORDS = [
  "operations",
  "clinical",
  "rehabilitation",
  "rehab",
  "patient services",
  "clinical services",
  "quality improvement",
  "quality assurance",
  "quality management",
  "care coordination",
  "care management",
  "care operations",
  "patient care",
  "patient experience",
  "program director",
  "program manager",
  "residential",
  "behavioral health",
  "idd",
  "developmental disabilities",
  "utilization review",
  "utilization management",
  "compliance",
  "regulatory",
  "accreditation",
  "population health",
  "value-based care",
  "discharge planning",
  "case management",
  "customer success", // relevant in health-tech context
  "implementation", // relevant for health-tech ops
  "client services",
  "provider operations",
  "workforce",
  "staff development",
  "training",
];

// Leadership-level title words — only relevant when paired with a domain keyword
const LEADERSHIP_KEYWORDS = [
  "director",
  "vp",
  "vice president",
  "head of",
  "chief",
  "regional manager",
  "senior manager",
  "general manager",
];

// Roles that are relevant by title alone, no domain keyword needed
const STANDALONE_RELEVANT = [
  "director of operations",
  "vp of operations",
  "vice president of operations",
  "director of clinical operations",
  "director of rehabilitation",
  "director of patient services",
  "director of clinical services",
  "director of quality",
  "director of care coordination",
  "director of care management",
  "director of compliance",
  "director of regulatory",
  "clinical operations manager",
  "operations director",
  "rehabilitation director",
  "program director",
  "regional director",
  "area director",
  "site director",
];

// Departments/functions that are NOT relevant to Emma
const IRRELEVANT_DEPARTMENTS = [
  "sales",
  "marketing",
  "partnership",
  "partnerships",
  "consultant relations",
  "business development",
  "revenue",
  "fundraising",
  "engineering",
  "software",
  "developer",
  "data science",
  "data engineer",
  "machine learning",
  "product manager",
  "product designer",
  "product design",
  "ux",
  "ui",
  "design",
  "brand",
  "creative",
  "content",
  "copywriter",
  "seo",
  "paid media",
  "paid marketing",
  "growth marketing",
  "demand gen",
  "finance",
  "fp&a",
  "accounting",
  "tax",
  "treasury",
  "investor",
  "legal",
  "counsel",
  "attorney",
  "recruiter",
  "recruiting",
  "talent acquisition",
  "people ops",
  "human resources",
  "hr ",
  "payroll",
  "benefits",
  "compensation",
  "it infrastructure",
  "security engineer",
  "cybersecurity",
  "devops",
  "platform engineer",
  "solutions architect",
  "enterprise sales",
  "account executive",
  "account manager",
  "public sector",
  "labor sales",
  "commercial strategy",
  "clinical trial",
  "clinical trials",
  "clinical research",
  "pharmaceutical",
  "pharma",
  "drug development",
  "medical affairs",
  "medical science liaison",
  "pharmacovigilance",
  "regulatory affairs",
  "real world evidence",
  "biostatistic",
  "epidemiol",
];

// Purely clinical treating roles (no leadership scope)
const CLINICAL_TREATING = [
  "speech-language pathologist",
  "speech therapist",
  "occupational therapist",
  "occupational therapy assistant",
  "cota",
  "physical therapist",
  "physical therapy assistant",
  "school psychologist",
  "registered nurse",
  "licensed practical nurse",
  "direct support professional",
  "teacher",
  "tutor",
  "aide",
  "technician",
  "intern",
  "fellow",
  "therapist", // generic therapist (treating role)
  "counselor", // treating counselor
  "psychiatrist",
  "psychologist",
  "nurse practitioner",
  "physician",
  "medical director", // typically a clinical MD role
];

export function isRelevantRole(title: string): boolean {
  const lower = title.toLowerCase();

  // 1. Check standalone matches first (most specific)
  if (STANDALONE_RELEVANT.some((kw) => lower.includes(kw))) {
    return true;
  }

  // 2. Exclude irrelevant departments regardless of title level
  if (IRRELEVANT_DEPARTMENTS.some((kw) => lower.includes(kw))) {
    return false;
  }

  // 3. Exclude purely clinical treating roles
  const isClinical = CLINICAL_TREATING.some((kw) => {
    // For short abbreviations, match as whole words
    if (kw.length <= 4) {
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      return regex.test(lower);
    }
    return lower.includes(kw);
  });

  // Clinical roles are excluded UNLESS the title also has a leadership + domain keyword
  if (isClinical) {
    const hasLeadership = LEADERSHIP_KEYWORDS.some((kw) => lower.includes(kw));
    const hasDomain = DOMAIN_KEYWORDS.some((kw) => lower.includes(kw));
    // e.g., "Director of Rehabilitation" (has "director" + "rehabilitation") = keep
    // e.g., "Physical Therapist" = exclude
    return hasLeadership && hasDomain;
  }

  // 4. For non-clinical roles: require BOTH a leadership keyword AND a domain keyword
  const hasLeadership = LEADERSHIP_KEYWORDS.some((kw) => lower.includes(kw));
  const hasDomain = DOMAIN_KEYWORDS.some((kw) => lower.includes(kw));

  return hasLeadership && hasDomain;
}

// Remote indicators
const REMOTE_KEYWORDS = [
  "remote",
  "work from home",
  "virtual",
  "telehealth",
];

// Specific cities/areas Emma would commute to
const ALLOWED_LOCATIONS = [
  "jersey city",
  "hoboken",
  "new york",
  "manhattan",
  "brooklyn",
  "queens",
  "bronx",
  "staten island",
];

// Broad terms that mean "anywhere in the US" — only valid when they're the
// entire location, not appended to a specific out-of-area city
const US_WIDE = [
  "united states",
  "nationwide",
  "us",
  "usa",
];

export function isRelevantLocation(location: string | null | undefined): boolean {
  // No location listed = assumed remote
  if (!location || location.trim() === "") return true;

  const lower = location.toLowerCase().trim();

  // 1. Remote roles — always include
  if (REMOTE_KEYWORDS.some((kw) => lower.includes(kw))) return true;

  // 2. Check if location is ONLY a US-wide term (e.g. "United States", "US")
  //    Strip common suffixes and check if nothing specific remains
  const stripped = lower
    .replace(/,?\s*united states/g, "")
    .replace(/,?\s*usa?$/g, "")
    .replace(/,?\s*nationwide/g, "")
    .trim();

  // If after stripping US-wide terms nothing is left, it's a national/remote role
  if (stripped === "" || stripped === "us" || stripped === "usa") return true;

  // 3. Check if the specific city/area is in our allowed list
  if (ALLOWED_LOCATIONS.some((kw) => stripped.includes(kw))) return true;

  // 4. Everything else (e.g., "Burlington, Massachusetts", "Torrance, California",
  //    "New Albany, Ohio") is out of commute range
  return false;
}
