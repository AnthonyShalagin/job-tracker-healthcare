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

function SortIcon({ field, active, order }: { field: string; active: boolean; order: string }) {
  if (!active) {
    return (
      <svg className="h-3 w-3 text-stone-300 ml-1 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    );
  }
  return (
    <svg className="h-3 w-3 text-stone-600 ml-1 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={order === "asc" ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
    </svg>
  );
}

export function RoleTable({ roles, sortField, sortOrder, onSort }: RoleTableProps) {
  if (roles.length === 0) {
    return (
      <div className="border-2 border-dashed border-stone-200 rounded-lg p-12 text-center">
        <p className="text-stone-500 text-sm">No roles found matching your filters.</p>
        <p className="text-stone-400 text-xs mt-1">Try adjusting your search or check back tomorrow.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider cursor-pointer hover:text-stone-700"
                onClick={() => onSort("company")}
              >
                Company <SortIcon field="company" active={sortField === "company"} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider cursor-pointer hover:text-stone-700"
                onClick={() => onSort("title")}
              >
                Title <SortIcon field="title" active={sortField === "title"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Salary
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider cursor-pointer hover:text-stone-700"
                onClick={() => onSort("firstSeen")}
              >
                Found <SortIcon field="firstSeen" active={sortField === "firstSeen"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-600 whitespace-nowrap">{role.company.name}</td>
                <td className="px-4 py-3 text-sm">
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {role.title}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-stone-500 whitespace-nowrap">{role.location || "Remote"}</td>
                <td className="px-4 py-3 text-sm text-stone-500 whitespace-nowrap">{role.salary || "—"}</td>
                <td className="px-4 py-3 text-sm text-stone-400 whitespace-nowrap">
                  {formatRelativeDate(role.postedDate || role.firstSeen)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={role.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {roles.map((role) => (
          <div key={role.id} className="border border-stone-200 rounded-lg p-4 bg-white">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-stone-500">{role.company.name}</span>
              <StatusBadge status={role.status} />
            </div>
            <a
              href={role.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm block mb-2"
            >
              {role.title}
            </a>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span>{role.location || "Remote"}</span>
              {role.salary && <span>{role.salary}</span>}
              <span>{formatRelativeDate(role.postedDate || role.firstSeen)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
