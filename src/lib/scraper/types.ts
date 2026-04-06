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
  atsType: "greenhouse" | "ashby" | "lever" | "html" | "unknown";
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
