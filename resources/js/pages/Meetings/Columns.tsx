import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';

const columns: Column<any>[] = [
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
        header: 'Start Time',
        accessor: (item) => new Date(item.start_time).toLocaleString(),
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
            <Badge variant={item.status === 'scheduled' ? 'default' : item.status === 'completed' ? 'success' : 'destructive'} className="capitalize">
                {item.status}
            </Badge>
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
