"use client";

import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

interface Role {
  id: string;
  title: string;
  url: string;
  location: string | null;
  salary: string | null;
  status: string;
  userStatus: string | null;
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
  onUserStatusChange?: (roleId: string, userStatus: string | null) => void;
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
  const d = new Date(postedDate || firstSeen);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const userStatusConfig: Record<string, { label: string; classes: string }> = {
  applied: { label: "Applied", classes: "bg-blue-50 text-blue-600 ring-blue-500/20" },
  interested: { label: "Interested", classes: "bg-violet-50 text-violet-600 ring-violet-500/20" },
  dismissed: { label: "Dismissed", classes: "bg-stone-50 text-stone-400 ring-stone-300/40" },
};

function ActionButtons({ role, onStatusChange }: { role: Role; onStatusChange: (status: string | null) => void }) {
  const [open, setOpen] = useState(false);

  if (role.userStatus) {
    const config = userStatusConfig[role.userStatus];
    return (
      <button
        onClick={() => { setOpen(!open); }}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ring-1 ring-inset cursor-pointer ${config.classes}`}
      >
        {config.label}
        {open && (
          <span className="ml-1 text-[10px] opacity-60" onClick={(e) => { e.stopPropagation(); onStatusChange(null); }}>
            clear
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onStatusChange("applied")}
        title="Mark as Applied"
        className="p-1 rounded hover:bg-blue-50 text-stone-300 hover:text-blue-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <button
        onClick={() => onStatusChange("interested")}
        title="Mark as Interested"
        className="p-1 rounded hover:bg-violet-50 text-stone-300 hover:text-violet-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </button>
      <button
        onClick={() => onStatusChange("dismissed")}
        title="Not Relevant"
        className="p-1 rounded hover:bg-stone-100 text-stone-300 hover:text-stone-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function RoleTable({ roles, sortField, sortOrder, onSort, onUserStatusChange }: RoleTableProps) {
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

  const handleStatusChange = (roleId: string, userStatus: string | null) => {
    if (onUserStatusChange) onUserStatusChange(roleId, userStatus);
  };

  // Split roles: dismissed at the bottom
  const activeRoles = roles.filter(r => r.userStatus !== "dismissed");
  const dismissedRoles = roles.filter(r => r.userStatus === "dismissed");
  const sortedRoles = [...activeRoles, ...dismissedRoles];

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors" onClick={() => onSort("company")}>
                Company <SortIndicator active={sortField === "company"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors" onClick={() => onSort("title")}>
                Role <SortIndicator active={sortField === "title"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Salary</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600 transition-colors" onClick={() => onSort("postedDate")}>
                Posted <SortIndicator active={sortField === "postedDate"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-stone-400 uppercase tracking-wider w-[100px]">Track</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoles.map((role, i) => (
              <tr
                key={role.id}
                className={`transition-colors ${role.userStatus === "dismissed" ? "opacity-40" : "hover:bg-blue-50/40"} ${i < sortedRoles.length - 1 ? "border-b border-stone-50" : ""}`}
              >
                <td className="px-4 py-3.5">
                  <span className="text-[13px] font-medium text-stone-700">{role.company.name}</span>
                </td>
                <td className="px-4 py-3.5">
                  <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline">
                    {role.title}
                  </a>
                </td>
                <td className="px-4 py-3.5"><span className="text-[13px] text-stone-500">{role.location || "Remote"}</span></td>
                <td className="px-4 py-3.5"><span className="text-[13px] text-stone-500">{role.salary || "—"}</span></td>
                <td className="px-4 py-3.5"><span className="text-[13px] text-stone-400">{formatPostedDate(role.postedDate, role.firstSeen)}</span></td>
                <td className="px-4 py-3.5"><StatusBadge status={role.status} /></td>
                <td className="px-4 py-3.5 text-center">
                  <ActionButtons role={role} onStatusChange={(s) => handleStatusChange(role.id, s)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2.5">
        {sortedRoles.map((role) => (
          <div key={role.id} className={`bg-white rounded-xl border border-stone-200 p-4 shadow-sm ${role.userStatus === "dismissed" ? "opacity-40" : ""}`}>
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{role.company.name}</span>
              <div className="flex items-center gap-2">
                <StatusBadge status={role.status} />
                <ActionButtons role={role} onStatusChange={(s) => handleStatusChange(role.id, s)} />
              </div>
            </div>
            <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium text-blue-600 hover:text-blue-700 leading-snug block mb-2">
              {role.title}
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-stone-400">
              <span>{role.location || "Remote"}</span>
              <span>{formatPostedDate(role.postedDate, role.firstSeen)}</span>
              {role.salary && <span className="text-stone-500 font-medium">{role.salary}</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
