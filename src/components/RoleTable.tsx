"use client";

import { useState, useRef, useEffect } from "react";
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

function formatPosted(postedDate: string | null, firstSeen: string): string {
  const d = new Date(postedDate || firstSeen);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 14) return "1w ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isNew(firstSeen: string): boolean {
  return Date.now() - new Date(firstSeen).getTime() < 24 * 60 * 60 * 1000;
}

const trackOptions = [
  { value: "interested", label: "Interested", color: "bg-violet-500" },
  { value: "applied", label: "Applied", color: "bg-blue-500" },
  { value: "dismissed", label: "Not relevant", color: "bg-stone-400" },
  { value: null, label: "Clear", color: "bg-transparent" },
] as const;

function TrackMenu({ role, onSelect }: { role: Role; onSelect: (status: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = trackOptions.find((o) => o.value === role.userStatus);
  const buttonLabel = current?.value ? current.label : "Track";
  const buttonStyle = current?.value
    ? current.value === "applied"
      ? "bg-blue-50 text-blue-600 border-blue-200"
      : current.value === "interested"
        ? "bg-violet-50 text-violet-600 border-violet-200"
        : "bg-stone-50 text-stone-400 border-stone-200"
    : "bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-stone-700";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-2.5 py-1 rounded-md text-[12px] font-medium border transition-all ${buttonStyle}`}
      >
        {buttonLabel}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 w-[140px] bg-white rounded-lg border border-stone-200 shadow-lg py-1">
          {trackOptions.map((opt) => {
            if (opt.value === null && !role.userStatus) return null;
            return (
              <button
                key={opt.label}
                onClick={() => { onSelect(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-stone-50 transition-colors flex items-center gap-2 ${
                  opt.value === role.userStatus ? "font-medium text-stone-800" : "text-stone-600"
                }`}
              >
                {opt.value && <span className={`w-2 h-2 rounded-full ${opt.color}`} />}
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
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

  const handleChange = (id: string, status: string | null) => {
    if (onUserStatusChange) onUserStatusChange(id, status);
  };

  // Active first, dismissed at bottom
  const active = roles.filter((r) => r.userStatus !== "dismissed");
  const dismissed = roles.filter((r) => r.userStatus === "dismissed");
  const sorted = [...active, ...dismissed];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600" onClick={() => onSort("company")}>
                Company <SortIndicator active={sortField === "company"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600" onClick={() => onSort("title")}>
                Role <SortIndicator active={sortField === "title"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Salary</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600" onClick={() => onSort("postedDate")}>
                Posted <SortIndicator active={sortField === "postedDate"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-stone-400 uppercase tracking-wider w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((role, i) => (
              <tr
                key={role.id}
                className={`transition-all ${
                  role.userStatus === "dismissed"
                    ? "opacity-30 hover:opacity-60"
                    : "hover:bg-stone-50/60"
                } ${i < sorted.length - 1 ? "border-b border-stone-50" : ""}`}
              >
                <td className="px-4 py-3">
                  <span className="text-[13px] font-medium text-stone-700">{role.company.name}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      {role.title}
                    </a>
                    {isNew(role.firstSeen) && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">NEW</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3"><span className="text-[13px] text-stone-500">{role.location || "Remote"}</span></td>
                <td className="px-4 py-3"><span className="text-[13px] text-stone-500">{role.salary || "—"}</span></td>
                <td className="px-4 py-3"><span className="text-[13px] text-stone-400">{formatPosted(role.postedDate, role.firstSeen)}</span></td>
                <td className="px-4 py-3 text-right">
                  <TrackMenu role={role} onSelect={(s) => handleChange(role.id, s)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-2">
        {sorted.map((role) => (
          <div key={role.id} className={`bg-white rounded-xl border border-stone-200 p-4 shadow-sm ${role.userStatus === "dismissed" ? "opacity-30" : ""}`}>
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{role.company.name}</span>
              <TrackMenu role={role} onSelect={(s) => handleChange(role.id, s)} />
            </div>
            <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium text-blue-600 hover:text-blue-700 leading-snug block mb-2">
              {role.title}
              {isNew(role.firstSeen) && (
                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">NEW</span>
              )}
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-stone-400">
              <span>{role.location || "Remote"}</span>
              <span>{formatPosted(role.postedDate, role.firstSeen)}</span>
              {role.salary && <span className="text-stone-500 font-medium">{role.salary}</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
