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
  const companyCount = new Set(roles.map((r) => r.company.name)).size;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
          Open Roles
        </h1>
        <p className="text-[13px] text-stone-500 mt-0.5">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {activeCount} active role{activeCount !== 1 ? "s" : ""} across {companyCount} compan{companyCount !== 1 ? "ies" : "y"} — remote and NYC/JC area
            </>
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
        <div className="flex items-center justify-center py-20">
          <div className="h-5 w-5 border-2 border-stone-200 border-t-stone-500 rounded-full animate-spin" />
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
