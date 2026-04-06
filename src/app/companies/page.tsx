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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">
          Tracked Companies
        </h1>
        <p className="text-sm text-stone-500">
          {companies.length} companies monitored. {totalActive} active roles
          found.
        </p>
      </div>

      <div className="mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white text-stone-700"
        >
          <option value="">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
