import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { Meeting } from '@/types';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { formatDateTime } from '@/utils/date-format';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MessageSquare } from 'lucide-react';

const MEETING_STATUS_OPTIONS = [
    { value: 'scheduled', label: 'Scheduled', colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'completed', label: 'Completed', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'cancelled', label: 'Cancelled', colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },
];

const getColumns = (openModal: any): Column<Meeting>[] => [
    {
        header: 'Title',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.title}</span>
            </div>
        ),
    },
    {
        header: 'Customer',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.customer?.name}</span>
                <span className="text-[10px] text-muted-foreground truncate">{item.customer?.company?.name || 'N/A'}</span>
            </div>
        ),
    },
    {
        header: 'Requirement',
        accessor: (item) => item.requirement?.title || 'N/A',
    },
    {
        header: 'Schedule Date Time',
        accessor: (item) => formatDateTime(item.scheduled_at)
    },
    {
        header: 'Type',
        accessor: (item) => (
            <Badge variant="outline" className="capitalize">
                {item.meeting_type}
            </Badge>
        ),
    },
    {
        header: 'Status',
        accessor: (item) => (
            <InlineStatusUpdate
                id={item.id}
                currentStatus={item.status}
                routeName="meetings.update-status"
                options={MEETING_STATUS_OPTIONS}
            />
        ),
    },
    {
        header: 'Representative',
        accessor: (item) => (
            <div className="flex flex-col">
                {item.user ? (
                    <>
                        <span className="text-xs font-medium">{item.user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{item.user.email}</span>
                    </>
                ) : (
                    <span className="text-xs text-muted-foreground italic">N/A</span>
                )}
            </div>
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="meetings"
                label="Meeting"
                customActions={
                    <DropdownMenuItem
                        onSelect={() => openModal('CREATE_FOLLOW_UP', {
                            customer_id: item.customer_id,
                            requirement_id: item.requirement_id
                        })}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" /> Add Follow-up
                    </DropdownMenuItem>
                }
            />
        ),
        className: 'w-[7%]',
    },
];

export { getColumns };
