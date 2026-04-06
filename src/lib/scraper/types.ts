export interface ScrapedRole {
  externalId: string;
  title: string;
  url: string;
  location?: string;
  salary?: string;
  description?: string;
  department?: string;
  postedDate?: Date;
}

export interface ScraperResult {
  companyName: string;
  roles: ScrapedRole[];
  error?: string;
  durationMs: number;
}

export interface CompanyConfig {
  name: string;
  website: string;
  careersUrl: string;
  atsType: "greenhouse" | "ashby" | "lever" | "workday" | "smartrecruiters" | "icims" | "html" | "unknown";
  workdayInstance?: string; // e.g. "nyp.wd1" for nyp.wd1.myworkdayjobs.com
  workdaySlug?: string; // e.g. "nypcareers"
  icimsPortal?: string; // e.g. "careers-hackensackmeridianhealth.icims.com"
  atsBoardToken?: string;
  category: string;
  glassdoorRating?: number;
  glassdoorUrl?: string;
  selectors?: {
    jobList: string;
    jobTitle: string;
    jobLink: string;
    jobLocation?: string;
  };
}
