import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const statusConfig: Record<string, { label: string; classes: string }> = {
        pending: {
            label: "Pending",
            classes: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
        },
        active: {
            label: "Active",
            classes: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
        },
        completed: {
            label: "Completed",
            classes: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
        },
        cancelled: {
            label: "Cancelled",
            classes: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
        },
        processing: {
            label: "Processing",
            classes: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200",
        },
    };

    const config = statusConfig[status.toLowerCase()] || {
        label: status,
        classes: "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200",
    };

    return (
        <Badge
            variant="outline"
            className={cn(
                "capitalize px-2.5 py-0.5 rounded-full font-bold text-[11px] border shadow-none",
                config.classes,
                className
            )}
        >
            {config.label}
        </Badge>
    );
}
