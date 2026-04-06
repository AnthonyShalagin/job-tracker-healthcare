import { HiringSignalBadge } from "./StatusBadge";
import { CATEGORY_LABELS } from "@/lib/companies";

interface RoleData {
  id: string;
  title: string;
  url: string;
  location: string | null;
}

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
  roles: RoleData[];
}

export function CompanyCard({ company }: { company: CompanyData }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:shadow-md hover:border-stone-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h3 className="font-semibold text-[14px] text-stone-800 leading-tight">{company.name}</h3>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {CATEGORY_LABELS[company.category] || company.category}
          </p>
        </div>
        <HiringSignalBadge signal={company.hiringSignal} />
      </div>

      {/* Role list */}
      <div className="mt-3 space-y-1.5">
        {company.roles.map((role) => (
          <a
            key={role.id}
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-[7px] shrink-0" />
            <span className="text-[13px] text-blue-600 group-hover:text-blue-700 group-hover:underline leading-snug">
              {role.title}
            </span>
          </a>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
        {company.glassdoorRating ? (
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[12px] text-stone-500">{company.glassdoorRating.toFixed(1)}</span>
          </div>
        ) : (
          <div />
        )}
        <a
          href={company.careersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-stone-500 hover:text-stone-700 transition-colors"
        >
          All openings
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>
    </div>
  );
}
