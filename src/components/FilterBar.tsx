"use client";

import { CATEGORY_LABELS } from "@/lib/companies";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-[7px] border border-stone-200 rounded-lg text-[13px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-colors"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-[7px] border border-stone-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-stone-700 cursor-pointer"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="stale">Stale</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-[7px] border border-stone-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-stone-700 cursor-pointer"
      >
        <option value="">All categories</option>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
