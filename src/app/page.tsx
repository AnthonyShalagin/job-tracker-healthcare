"use client";

import { useState, useEffect, useCallback } from "react";
import { RoleTable } from "@/components/RoleTable";
import { FilterBar } from "@/components/FilterBar";

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

export default function Dashboard() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [sortField, setSortField] = useState("firstSeen");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    params.set("sort", sortField);
    params.set("order", sortOrder);

    try {
      const res = await fetch(`/api/roles?${params}`);
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    } finally {
      setLoading(false);
    }
  }, [status, category, search, sortField, sortOrder]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  function handleSort(field: string) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  }

  const activeCount = roles.filter((r) => r.status === "active").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">
          Role Dashboard
        </h1>
        <p className="text-sm text-stone-500">
          Director-level healthcare operations roles, verified daily.
          {!loading && (
            <span className="ml-2">
              {activeCount} active role{activeCount !== 1 ? "s" : ""} across{" "}
              {new Set(roles.map((r) => r.company.name)).size} companies.
            </span>
          )}
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
        </div>
      ) : (
        <RoleTable
          roles={roles}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
