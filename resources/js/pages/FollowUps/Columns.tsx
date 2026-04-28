import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';

const FOLLOW_UP_OPTIONS = [
    { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: 'done', label: 'Done', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
];

const columns: Column<any>[] = [
    {
        header: 'Customer',
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Follow Up Date',
        accessor: (item) => new Date(item.follow_up_date).toLocaleDateString(),
    },
    {
        header: 'Status',
        accessor: (item) => (
            <InlineStatusUpdate
                id={item.id}
                currentStatus={item.status}
                routeName="follow-ups.update-status"
                options={FOLLOW_UP_OPTIONS}
            />
        ),
    },
    {
        header: 'Priority',
        accessor: (item) => (
            <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'} className="capitalize">
                {item.priority}
            </Badge>
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="follow-ups"
                label="Follow Up"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
