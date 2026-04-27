import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
    followUp: any;
}

const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    done: { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
};

export function FollowUpStatusUpdate({ followUp }: Props) {
    const [loading, setLoading] = useState(false);

    const updateStatus = (newStatus: string) => {
        setLoading(true);
        router.patch(route('follow-ups.update-status', followUp.id), {
            status: newStatus
        }, {
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                disabled={loading}
                value={followUp.status}
                onValueChange={updateStatus}
            >
                <SelectTrigger className="h-7 border-none bg-transparent p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 w-auto">
                    {loading ? (
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    ) : (
                        <Badge
                            variant="outline"
                            className={cn(
                                "capitalize text-[10px] px-2 h-5 cursor-pointer hover:opacity-80 transition-opacity",
                                statusConfig[followUp.status as keyof typeof statusConfig]?.color
                            )}
                        >
                            {followUp.status}
                        </Badge>
                    )}
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                    <SelectItem value="done" className="text-xs">Done</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
