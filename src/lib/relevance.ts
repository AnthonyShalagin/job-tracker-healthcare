/**
 * AI-style relevance scoring for job roles.
 * Scores each role 0-100 based on fit to the candidate's profile.
 * Only roles scoring 60+ should be added to the tracker.
 *
 * Candidate profile:
 * - CCC-SLP turned healthcare operations leader
 * - Program Director at IDD residential org ($9MM budget, 100+ staff)
 * - Director of Rehabilitation at SNF (30+ PTs/OTs/SLPs, $5MM revenue)
 * - Senior Manager Healthcare Operations at Nuance/Microsoft (AI clinical docs, $6MM ARR, 150+ staff)
 * - Operations Manager at Signify Health (value-based care, $500MM program)
 * - Lean Six Sigma Yellow Belt
 * - Looking for: Remote, NYC, Jersey City, Hoboken (within 1hr public transit)
 */

interface ScoredRole {
  title: string;
  company: string;
  location: string;
  score: number;
  reason: string;
  pass: boolean;
}

// Positive signals — each adds points
const STRONG_FIT_TITLES: [RegExp, number][] = [
  [/director.*(rehabilitation|rehab)/i, 30],
  [/director.*operations/i, 25],
  [/director.*clinical (operations|services)/i, 30],
  [/director.*patient services/i, 25],
  [/director.*quality/i, 25],
  [/director.*care (coordination|management)/i, 25],
  [/director.*program/i, 20],
  [/program director/i, 20],
  [/vp.*operations/i, 25],
  [/vice president.*operations/i, 25],
  [/regional director/i, 20],
  [/area director/i, 20],
  [/senior director.*clinical/i, 25],
  [/senior director.*operations/i, 25],
  [/executive director/i, 20],
  [/clinical operations manager/i, 20],
  [/senior manager.*operations/i, 18],
  [/senior manager.*clinical/i, 18],
  [/director.*compliance/i, 15],
  [/director.*workforce/i, 15],
  [/director.*staffing/i, 15],
];

// Industry/setting bonuses
const INDUSTRY_BONUS: [RegExp, number][] = [
  [/idd|developmental disabilit|intellectual disabilit/i, 15],
  [/rehabilitation|rehab|snf|skilled nursing/i, 15],
  [/behavioral health|mental health/i, 10],
  [/home (health|care)|hospice/i, 10],
  [/telehealth|virtual care|remote care/i, 10],
  [/value.based care|population health/i, 10],
  [/health system|hospital/i, 5],
];

// Negative signals — each subtracts points
const NEGATIVE_SIGNALS: [RegExp, number, string][] = [
  [/medical director/i, -50, "Requires MD"],
  [/chief medical/i, -50, "Requires MD"],
  [/physician|psychiatrist|psychologist/i, -40, "Clinical MD/PhD role"],
  [/clinical trial|drug development|pharma/i, -50, "Pharma/clinical trials"],
  [/regulatory affairs|pharmacovigilance/i, -40, "Pharma regulatory"],
  [/sales|revenue|business development/i, -40, "Sales/BD role"],
  [/marketing|brand|creative|content/i, -40, "Marketing role"],
  [/engineer|software|developer|devops/i, -50, "Engineering role"],
  [/product manager|product design|ux|ui/i, -40, "Product role"],
  [/data scien|machine learning|analytics/i, -30, "Data/analytics role"],
  [/finance|fp&a|accounting|tax|treasury/i, -40, "Finance role"],
  [/legal|counsel|attorney/i, -40, "Legal role"],
  [/recruiter|talent acquisition|human resources/i, -30, "HR role"],
  [/customer success/i, -25, "Customer success, not healthcare ops"],
  [/insurance|underwriting|actuar/i, -30, "Insurance role"],
  [/dental|veterinar/i, -30, "Wrong healthcare vertical"],
  [/registered nurse|rn required|bsn required/i, -25, "Requires RN"],
  [/physician required|md required/i, -50, "Requires MD"],
];

// Location scoring
const LOCATION_SCORES: [RegExp, number][] = [
  [/jersey city/i, 20],
  [/hoboken/i, 20],
  [/remote/i, 15],
  [/manhattan|new york.*ny/i, 15],
  [/brooklyn/i, 12],
  [/bronx|queens|staten island/i, 10],
  [/united states.*remote|us remote/i, 15],
  // Close NJ
  [/hackensack|teaneck|paramus|fort lee|clifton|montclair|west orange|glen ridge/i, 12],
  [/newark|bayonne/i, 12],
  [/yonkers|white plains/i, 8],
  // Too far
  [/cherry hill|lakewood|neptune|brick|trenton|edison|new brunswick/i, -20],
  [/philadelphia|boston|chicago|dallas|atlanta|los angeles|san francisco/i, -30],
];

export function scoreRole(
  title: string,
  company: string,
  location: string | null,
  description?: string
): ScoredRole {
  let score = 30; // Base score
  const reasons: string[] = [];
  const loc = location || "Remote";
  const fullText = `${title} ${company} ${description || ""}`;

  // Title scoring
  for (const [pattern, points] of STRONG_FIT_TITLES) {
    if (pattern.test(title)) {
      score += points;
      reasons.push(`+${points} title match`);
      break; // Only count the best title match
    }
  }

  // Industry bonus
  for (const [pattern, points] of INDUSTRY_BONUS) {
    if (pattern.test(fullText)) {
      score += points;
      reasons.push(`+${points} industry fit`);
      break;
    }
  }

  // Negative signals
  for (const [pattern, points, reason] of NEGATIVE_SIGNALS) {
    if (pattern.test(title) || pattern.test(fullText)) {
      score += points; // points are negative
      reasons.push(`${points} ${reason}`);
    }
  }

  // Location scoring
  for (const [pattern, points] of LOCATION_SCORES) {
    if (pattern.test(loc)) {
      score += points;
      if (points > 0) reasons.push(`+${points} location`);
      else reasons.push(`${points} location too far`);
      break;
    }
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  return {
    title,
    company,
    location: loc,
    score,
    reason: reasons.join("; "),
    pass: score >= 60,
  };
}

/**
 * Batch score and filter roles. Returns only roles scoring 60+.
 */
export function filterRelevantRoles(
  roles: { title: string; company: string; location: string | null; description?: string }[]
): ScoredRole[] {
  return roles
    .map((r) => scoreRole(r.title, r.company, r.location, r.description))
    .filter((r) => r.pass)
    .sort((a, b) => b.score - a.score);
}
