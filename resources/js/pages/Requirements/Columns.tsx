import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { TableRowActions } from '@/components/table/TableRowActions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Column, Requirement } from '@/types';
import { FileDown, History, Video } from 'lucide-react';
import { Link } from '@inertiajs/react';

const RequirementOptions = [
    { value: 'pending', label: "Pending", colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: "processing", label: "Processing", colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: "purchased", label: "Purchased", colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: "cancel", label: "Cancel", colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },

];


const columns: Column<Requirement>[] = [
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
        header: 'Requirement Title',
        accessor: (item) => (
            <div className="font-medium text-sm">
                {item.title || `REQ-${item.id}`}
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
        header: 'Representative',
        accessor: (item) => (
            <div className="flex flex-col">
                {item.customer?.assigned_user ? (
                    <>
                        <span className="text-xs font-medium">{item.customer.assigned_user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{item.customer.assigned_user.email}</span>
                    </>
                ) : (
                    <span className="text-xs text-muted-foreground italic">N/A</span>
                )}
            </div>
        ),
    },
    {
        header: 'Notes',
        accessor: (item) => (
            <div className="max-w-50">
                <p className="text-xs text-muted-foreground truncate" title={item.notes ?? undefined}>
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
                customActions={
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={route('meetings.create', { customer_id: item.customer_id, requirement_id: item.id })}>
                                <Video className="w-4 h-4 mr-2" /> Add Meeting
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('follow-ups.create', { customer_id: item.customer_id, requirement_id: item.id })}>
                                <History className="w-4 h-4 mr-2" /> Add Follow-up
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href={route('requirements.download', item.id)} target="_blank">
                                <FileDown className="w-4 h-4 mr-2" /> Download PDF
                            </a>
                        </DropdownMenuItem>
                    </>
                }
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns, RequirementOptions };
