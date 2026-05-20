import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { formatDate } from '@/utils/date-format';
import { FollowUp } from '@/types';


const FOLLOW_UP_OPTIONS = [
    { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: 'done', label: 'Done', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
];

const columns: Column<FollowUp>[] = [
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
                resource="follow-ups"
                label="Follow Up"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
