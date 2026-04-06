"use client";

import { StatusBadge } from "./StatusBadge";
import { formatRelativeDate } from "@/lib/utils";

interface Role {
  id: string;
  title: string;
  url: string;
  location: string | null;
  salary: string | null;
  status: string;
  firstSeen: string;
  postedDate: string | null;
  company: {
    name: string;
    category: string;
  };
}

interface RoleTableProps {
  roles: Role[];
  sortField: string;
  sortOrder: string;
  onSort: (field: string) => void;
}

function SortIndicator({ active, order }: { active: boolean; order: string }) {
  if (!active) return null;
  return (
    <svg className="h-3 w-3 text-stone-500 ml-0.5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={order === "asc" ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
    </svg>
  );
}

function formatPostedDate(postedDate: string | null, firstSeen: string): string {
  if (postedDate) {
    const d = new Date(postedDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return formatRelativeDate(firstSeen);
}

export function RoleTable({ roles, sortField, sortOrder, onSort }: RoleTableProps) {
  if (roles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p className="text-stone-600 text-sm font-medium">No roles found</p>
        <p className="text-stone-400 text-xs mt-1">Try adjusting your filters or check back tomorrow.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors"
                onClick={() => onSort("company")}
              >
                Company <SortIndicator active={sortField === "company"} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors"
                onClick={() => onSort("title")}
              >
                Role <SortIndicator active={sortField === "title"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Salary
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors"
                onClick={() => onSort("postedDate")}
              >
                Posted <SortIndicator active={sortField === "postedDate"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, i) => (
              <tr
                key={role.id}
                className={`hover:bg-blue-50/40 transition-colors ${i < roles.length - 1 ? "border-b border-stone-50" : ""}`}
              >
                <td className="px-4 py-3.5">
                  <span className="text-[13px] font-medium text-stone-700">{role.company.name}</span>
                </td>
                <td className="px-4 py-3.5">
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {role.title}
                  </a>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-[13px] text-stone-500">{role.location || "Remote"}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-[13px] text-stone-500">{role.salary || "—"}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-[13px] text-stone-400">{formatPostedDate(role.postedDate, role.firstSeen)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={role.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2.5">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{role.company.name}</span>
              <StatusBadge status={role.status} />
            </div>
            <a
              href={role.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-blue-600 hover:text-blue-700 leading-snug block mb-2"
            >
              {role.title}
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-stone-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {role.location || "Remote"}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {formatPostedDate(role.postedDate, role.firstSeen)}
              </span>
              {role.salary && (
                <span className="text-stone-500 font-medium">{role.salary}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
