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
  userStatus: string | null;
  firstSeen: string;
  postedDate: string | null;
  relevanceScore?: number;
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

  async function handleUserStatusChange(roleId: string, userStatus: string | null) {
    // Optimistic update
    setRoles((prev) =>
      prev.map((r) => (r.id === roleId ? { ...r, userStatus } : r))
    );

    await fetch(`/api/roles/${roleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userStatus }),
    });
  }

  const activeCount = roles.filter((r) => r.status === "active").length;
  const companyCount = new Set(roles.map((r) => r.company.name)).size;

  // Count new roles (first seen in last 24 hours)
  const newToday = roles.filter((r) => {
    const seen = new Date(r.firstSeen);
    return Date.now() - seen.getTime() < 24 * 60 * 60 * 1000;
  }).length;

  const appliedCount = roles.filter((r) => r.userStatus === "applied").length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">
            Open Roles
          </h1>
          {newToday > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-blue-100 text-blue-700">
              {newToday} new today
            </span>
          )}
        </div>
        <p className="text-[13px] text-stone-500">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {activeCount} active across {companyCount} companies
              {appliedCount > 0 && <> &middot; {appliedCount} applied</>}
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
          onUserStatusChange={handleUserStatusChange}
        />
      )}
    </div>
  );
}
