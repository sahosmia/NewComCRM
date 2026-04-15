import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

const columns: Column<any>[] = [
    {
        header: 'Customer',
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Product',
        accessor: (item) => item.product?.name,
    },
    {
        header: 'Quantity',
        accessor: (item) => item.quantity,
    },
    {
        header: 'Unit Price',
        accessor: (item) => item.unit_price,
    },
    {
        header: 'Total Price',
        accessor: (item) => item.total_price,
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
                <DropdownMenuContent align="end" className="w-40">
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
                        description="This action cannot be undone. This requirement will be permanently removed."
                        onConfirm={() => handleDelete(item.id, 'requirements.destroy', {
                            redirectTo: 'requirements.index',
                        })}
                    >
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600 focus:text-red-600 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4 mr-2 text-red-600 focus:text-red-600 cursor-pointer" />
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
