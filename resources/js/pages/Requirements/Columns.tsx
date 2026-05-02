import type { Column } from '@/types';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { TableRowActions } from '@/components/table/TableRowActions';

const RequirementOptions = [
    { value: 'pending', label: "Pending", colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: "processing", label: "Processing", colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: "purchased", label: "Purchased", colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: "cancel", label: "Cancel", colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },

];


const columns: Column<any>[] = [
    {
        header: 'Customer',
        accessor: (item) => (
            <div className="flex flex-col min-w-35">
                <span className="font-medium leading-none">{item.customer?.name}</span>
                <span className="text-[11px] text-muted-foreground mt-1 truncate">{item.customer?.company?.name}</span>
            </div>
        ),
    },
    {
        header: 'Requested Products',
        accessor: (item) => (
            <div className="flex flex-wrap gap-1 max-w-62">
                {item.items?.map((row: any) => (
                    <span key={row.id} className="text-sm py-0  whitespace-nowrap truncate">
                        {row.product?.name}
                        x {row.quantity} {row.product?.unit?.short_form}
                    </span>
                ))}

            </div>
        ),
    },
    {
        header: 'Grand Total',
        accessor: (item) => (
            <div className="font-semibold text-sm">
                {item.grand_total}
            </div>
        ),
    },
    {
        header: 'Status',
        accessor: (item) => (
            <InlineStatusUpdate
             id={item.id}
                currentStatus={item.status}
                routeName="requirements.update-status"
                options={RequirementOptions}

            />
        ),
    },
    {
        header: 'Notes',
        accessor: (item) => (
            <div className="max-w-50">
                <p className="text-xs text-muted-foreground truncate" title={item.notes}>
                    {item.notes || '---'}
                </p>
            </div>
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="requirements"
                label="Requirement"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns, RequirementOptions };
