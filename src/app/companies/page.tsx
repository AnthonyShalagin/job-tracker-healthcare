"use client";

import { useState, useEffect } from "react";
import { CompanyCard } from "@/components/CompanyCard";
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

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter) params.set("category", categoryFilter);

      const res = await fetch(`/api/companies?${params}`);
      const data = await res.json();
      setCompanies(data);
      setLoading(false);
    }
    fetchCompanies();
  }, [categoryFilter]);

  const totalActive = companies.reduce((sum, c) => sum + c.activeRoles, 0);
  const withRoles = companies.filter((c) => c.activeRoles > 0).length;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          Companies
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          {companies.length} companies tracked, {withRoles} with active roles ({totalActive} total)
        </p>
      </div>

      <div className="mb-5">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-5 w-5 border-2 border-stone-200 border-t-stone-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
