const statusConfig: Record<string, { classes: string; label: string }> = {
  active: { classes: "bg-emerald-50 text-emerald-600 ring-emerald-500/20", label: "Active" },
  stale: { classes: "bg-amber-50 text-amber-600 ring-amber-500/20", label: "Stale" },
  closed: { classes: "bg-red-50 text-red-600 ring-red-500/20", label: "Closed" },
  unverified: { classes: "bg-stone-50 text-stone-500 ring-stone-500/20", label: "Unverified" },
};

const signalConfig: Record<string, { classes: string; label: string }> = {
  active: { classes: "bg-emerald-50 text-emerald-600 ring-emerald-500/20", label: "Actively Hiring" },
  dormant: { classes: "bg-amber-50 text-amber-600 ring-amber-500/20", label: "Dormant" },
  cold_outreach: { classes: "bg-stone-50 text-stone-400 ring-stone-500/20", label: "Cold Outreach" },
  unknown: { classes: "bg-stone-50 text-stone-400 ring-stone-500/20", label: "No Data" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.unverified;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ring-1 ring-inset ${config.classes}`}>
      {config.label}
    </span>
  );
}

export function HiringSignalBadge({ signal }: { signal: string }) {
  const config = signalConfig[signal] || signalConfig.unknown;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ring-1 ring-inset ${config.classes}`}>
      {config.label}
    </span>
  );
}
