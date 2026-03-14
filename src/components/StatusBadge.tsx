import { cn } from "@/lib/utils";

type ApplicationStatus = 
  | "DRAFT" 
  | "SUBMITTED" 
  | "SCRUTINY" 
  | "EDS" 
  | "REFERRED" 
  | "MOM_GENERATED" 
  | "FINALIZED";

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  DRAFT: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
  SUBMITTED: {
    label: "Submitted",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  SCRUTINY: {
    label: "Under Scrutiny",
    className: "bg-violet-50 text-violet-700 border-violet-100",
  },
  EDS: {
    label: "EDS Raised",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  REFERRED: {
    label: "Referred",
    className: "bg-purple-50 text-purple-700 border-purple-100",
  },
  MOM_GENERATED: {
    label: "MoM Generated",
    className: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
  FINALIZED: {
    label: "Finalized",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.DRAFT;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tabular-nums tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export type { ApplicationStatus };
