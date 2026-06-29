import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FollowUp } from "@/types";

function FollowUpList({ followups }: { followups: FollowUp[] }) {
    if (followups.length === 0) return (
        <div className="flex h-32 items-center justify-center text-muted-foreground">
            No follow-ups for today!
        </div>
    );

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const priorityColors: Record<string, string> = {
        high: "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400",
        medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-amber-950/30 dark:text-amber-400",
        low: "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-emerald-950/30 dark:text-emerald-400",
    };

    return (
        <div className="space-y-3">
            {followups.map((item) => (
                <Link
                    key={item.id}
                    href={route('follow-ups.show', item.id)}
                    className="group flex items-center justify-between p-4 border rounded-xl hover:bg-muted/40 transition-all duration-200 border border-transparent hover:border-border"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                {item.customer?.name || "Unknown Customer"}
                            </span>
                            <Badge className={`text-[10px] px-1.5 py-0 capitalize border-none ${priorityColors[item.priority]}`}>
                                {item.priority}
                            </Badge>
                        </div>

                        <div className="flex flex-col text-xs text-muted-foreground">
                            <span className="font-medium text-primary">
                                🕒 {formatTime(item.follow_up_date)}
                            </span>
                            {item.requirement && (
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                    📋 {item.requirement.title || `Req #${item.requirement.id}`}
                                </span>
                            )}
                            <span className="line-clamp-1 italic">
                                {item.notes}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-8 px-3 inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                            Details
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default FollowUpList;
