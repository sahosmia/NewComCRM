import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { Meeting } from '@/types';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';

const MEETING_STATUS_OPTIONS = [
    { value: 'scheduled', label: 'Scheduled', colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'completed', label: 'Completed', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'cancelled', label: 'Cancelled', colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },
];

const columns: Column<Meeting>[] = [
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
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Requirement',
        accessor: (item) => item.requirement?.title || 'N/A',
    },
    {
        header: 'Schedule Date Time',
        accessor: (item) => new Date(item.scheduled_at).toLocaleString(),
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
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="meetings"
                label="Meeting"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
