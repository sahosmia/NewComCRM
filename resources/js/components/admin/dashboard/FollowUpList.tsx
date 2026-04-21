import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function FollowUpList({ followups }: { followups: any[] }) {
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
        high: "bg-red-100 text-red-700 hover:bg-red-100",
        medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
        low: "bg-green-100 text-green-700 hover:bg-green-100",
    };

    return (
        <div className="space-y-3">
            {followups.map((item) => (
                <div
                    key={item.id}
                    className="group flex items-center justify-between p-4 border rounded-xl hover:bg-muted/40 transition-all duration-200"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">
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
                            <span className="line-clamp-1 italic">
                                {item.notes}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            Details
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FollowUpList;
