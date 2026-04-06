import { HiringSignalBadge } from "./StatusBadge";
import { CATEGORY_LABELS } from "@/lib/companies";

interface CompanyData {
  id: string;
  name: string;
  website: string | null;
  careersUrl: string;
  category: string;
  glassdoorRating: number | null;
  hiringSignal: string;
  lastScraped: string | null;
  activeRoles: number;
}

export function CompanyCard({ company }: { company: CompanyData }) {
  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-white hover:border-stone-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-stone-800 text-sm">{company.name}</h3>
        <HiringSignalBadge signal={company.hiringSignal} />
      </div>

      <p className="text-xs text-stone-400 mb-3">
        {CATEGORY_LABELS[company.category] || company.category}
      </p>

      <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
        <span className="font-medium text-stone-700">
          {company.activeRoles} active role{company.activeRoles !== 1 ? "s" : ""}
        </span>
        {company.glassdoorRating && (
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {company.glassdoorRating.toFixed(1)}
          </span>
        )}
      </div>

      <a
        href={company.careersUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
      >
        View careers page
      </a>
    </div>
  );
}
