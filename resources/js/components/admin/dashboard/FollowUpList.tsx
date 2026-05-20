import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FollowUp } from "@/types";
import { Link } from "@inertiajs/react";

function FollowUpList({ followups, emptyMessage = "No follow-ups found!" }: { followups: FollowUp[], emptyMessage?: string }) {
    if (followups.length === 0) return (
        <div className="flex h-32 items-center justify-center text-muted-foreground text-sm italic">
            {emptyMessage}
        </div>
    );

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
        });
    };

    const isToday = (dateString: string) => {
        const d = new Date(dateString);
        const today = new Date();
        return d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d.getFullYear() === today.getFullYear();
    };

    const priorityColors: Record<string, string> = {
        high: "bg-red-100 text-red-700 hover:bg-red-100",
        medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        low: "bg-green-100 text-green-700 hover:bg-green-100",
    };

    return (
        <div className="space-y-3">
            {followups.map((item) => (
                <div
                    key={item.id}
                    className="group flex items-center justify-between p-3 border rounded-xl hover:bg-muted/40 transition-all duration-200"
                >
                    <div className="flex flex-col gap-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground truncate">
                                {item.customer?.name || "Unknown Customer"}
                            </span>
                            <Badge className={`text-[10px] px-1.5 py-0 capitalize border-none ${priorityColors[item.priority]}`}>
                                {item.priority}
                            </Badge>
                        </div>

                        <div className="flex flex-col text-xs text-muted-foreground">
                            <span className="font-medium text-primary">
                                🕒 {isToday(item.follow_up_date) ? formatTime(item.follow_up_date) : `${formatDate(item.follow_up_date)} ${formatTime(item.follow_up_date)}`}
                            </span>
                            <span className="line-clamp-1 italic text-[11px]">
                                {item.notes}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/customers/${item.customer_id}`}>
                            <Button variant="ghost" size="sm" className="h-8 text-xs px-2">
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FollowUpList;
