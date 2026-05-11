import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { formatDate } from '@/utils/date-format';
import { FollowUp } from '@/types';


export const FOLLOW_UP_OPTIONS = [
    { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: 'follow_up', label: 'Follow Up', colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'price_shared', label: 'Price Shared', colorClass: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
    { value: 'negotiation', label: 'Negotiation', colorClass: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { value: 'purchase', label: 'Purchase', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'done', label: 'Done', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'lost', label: 'Lost', colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },
];

const columns: Column<FollowUp>[] = [
    {
        header: 'Customer',
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Follow Up Date',
        accessor: (item) => formatDate(item.follow_up_date),
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
