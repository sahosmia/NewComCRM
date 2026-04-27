import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
    requirement: any;
}

const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    processing: { color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    purchased: { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    cancel: { color: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

export function RequirementStatusUpdate({ requirement }: Props) {
    const [loading, setLoading] = useState(false);

    const updateStatus = (newStatus: string) => {
        setLoading(true);
        router.patch(route('requirements.update-status', requirement.id), {
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
                value={requirement.status}
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
                                statusConfig[requirement.status as keyof typeof statusConfig]?.color
                            )}
                        >
                            {requirement.status}
                        </Badge>
                    )}
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                    <SelectItem value="processing" className="text-xs">Processing</SelectItem>
                    <SelectItem value="purchased" className="text-xs">Purchased</SelectItem>
                    <SelectItem value="cancel" className="text-xs">Cancel</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
