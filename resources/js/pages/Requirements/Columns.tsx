import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';

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
                <span className="text-[11px] text-muted-foreground mt-1 truncate">{item.customer?.company_name}</span>
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
                        x {row.quantity}
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-45">
                    <DropdownMenuItem asChild>
                        <Link href={route('requirements.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('requirements.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Requirement?"
                        description="Warning: This will delete the requirement and all items associated with it."
                        onConfirm={() => handleDelete(item.id, 'requirements.destroy', {
                            redirectTo: 'requirements.index',
                        })}
                    >
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600 focus:text-red-600 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </AlertDialogDestructive>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        className: 'w-[7%]',
    },
];

export { columns };
