const INCLUDE_KEYWORDS = [
  "director",
  "vp",
  "vice president",
  "program director",
  "regional manager",
  "head of",
  "chief",
  "operations manager",
  "operations",
  "clinical supervisor",
  "clinical lead",
  "rehabilitation",
  "patient services",
  "clinical services",
  "quality improvement",
  "quality",
  "care coordination",
  "manager",
  "strategy",
  "growth",
  "business development",
  "supervisor",
];

const EXCLUDE_KEYWORDS = [
  "speech-language pathologist",
  "speech therapist",
  "slp",
  "occupational therapist",
  "occupational therapy assistant",
  "cota",
  "physical therapist",
  "physical therapy assistant",
  "pta",
  "school psychologist",
  "bcba",
  "rbt",
  "registered nurse",
  "licensed practical nurse",
  "lpn",
  "direct support professional",
  "dsp",
  "teacher",
  "tutor",
  "aide",
  "technician",
  "intern",
];

// Words that, when paired with an exclude keyword, override the exclusion
const LEADERSHIP_OVERRIDES = [
  "director",
  "vp",
  "vice president",
  "head of",
  "chief",
  "manager",
  "supervisor",
  "lead",
  "regional",
  "program",
];

export function isRelevantRole(title: string): boolean {
  const lower = title.toLowerCase();

  const hasInclude = INCLUDE_KEYWORDS.some((kw) => lower.includes(kw));
  const hasExclude = EXCLUDE_KEYWORDS.some((kw) => {
    // For short abbreviations like "ot", "pt", "slp", match as whole words
    if (kw.length <= 3) {
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      return regex.test(lower);
    }
    return lower.includes(kw);
  });

  if (!hasInclude) return false;

  // If has both include and exclude keywords, check for leadership override
  if (hasExclude) {
    return LEADERSHIP_OVERRIDES.some((override) => lower.includes(override));
  }

  return true;
}

const LOCATION_INCLUDE = [
  "remote",
  "work from home",
  "virtual",
  "telehealth",
  "nj",
  "new jersey",
  "jersey city",
  "hoboken",
  "newark",
  "bayonne",
  "ny",
  "new york",
  "manhattan",
  "brooklyn",
  "queens",
  "bronx",
  "staten island",
  "united states",
  "nationwide",
];

export function isRelevantLocation(location: string | null | undefined): boolean {
  // No location = assumed remote
  if (!location || location.trim() === "") return true;

  const lower = location.toLowerCase();

  // Check for US-wide / remote
  if (lower === "us" || lower === "usa") return true;

  return LOCATION_INCLUDE.some((kw) => lower.includes(kw));
}
