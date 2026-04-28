import type { Column } from '@/types';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';

const QUOTATION_STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft', colorClass: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
    { value: 'sent', label: 'Sent', colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'accepted', label: 'Accepted', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'declined', label: 'Declined', colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },
];

const columns: Column<any>[] = [
    {
        header: 'Quotation #',
        accessor: (item) => item.quotation_number,
    },
    {
        header: 'Customer',
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Date',
        accessor: (item) => new Date(item.quotation_date).toLocaleDateString(),
    },
    {
        header: 'Total',
        accessor: (item) => item.total,
    },
    {
        header: 'Status',
        accessor: (item) => (
            <InlineStatusUpdate
                id={item.id}
                currentStatus={item.status}
                routeName="quotations.update-status"
                options={QUOTATION_STATUS_OPTIONS}
            />
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="quotations"
                label="Quotation"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
