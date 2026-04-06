const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Active" },
  stale: { bg: "bg-amber-50", text: "text-amber-700", label: "Stale" },
  closed: { bg: "bg-red-50", text: "text-red-700", label: "Closed" },
  unverified: { bg: "bg-stone-100", text: "text-stone-500", label: "Unverified" },
};

const signalConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Actively Hiring" },
  dormant: { bg: "bg-amber-50", text: "text-amber-700", label: "Dormant" },
  cold_outreach: { bg: "bg-stone-100", text: "text-stone-500", label: "Cold Outreach" },
  unknown: { bg: "bg-stone-100", text: "text-stone-400", label: "Unknown" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.unverified;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

export function HiringSignalBadge({ signal }: { signal: string }) {
  const config = signalConfig[signal] || signalConfig.unknown;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
