import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// Define a type for the status configuration
export interface StatusOption {
    value: string;
    label: string;
    colorClass: string;
}

interface InlineStatusUpdateProps {
    id: number | string;
    currentStatus: string;
    routeName: string;       // e.g., 'customers.update-status'
    options: StatusOption[]; // Array of possible statuses
    method?: 'patch' | 'put' | 'post';
}

export function InlineStatusUpdate({
    id,
    currentStatus,
    routeName,
    options,
    method = 'patch'
}: InlineStatusUpdateProps) {
    const [loading, setLoading] = useState(false);

    // Find the config for the active status to apply colors
    const activeOption = options.find(opt => opt.value === currentStatus);

    const updateStatus = (newStatus: string) => {
        if (newStatus === currentStatus) return;

        setLoading(true);
        router[method](route(routeName, id), {
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
                value={currentStatus}
                onValueChange={updateStatus}
            >
                <SelectTrigger className="h-7 border-none bg-transparent p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 w-auto">
                    {loading ? (
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    ) : (
                        <Badge
                            variant="outline"
                            className={cn(
                                "capitalize text-[10px] px-2 h-5 cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap",
                                activeOption?.colorClass || "bg-gray-500/10 text-gray-600 border-gray-500/20"
                            )}
                        >
                            {activeOption?.label || currentStatus}
                        </Badge>
                    )}
                </SelectTrigger>
                <SelectContent align="end">
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-xs capitalize"
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
