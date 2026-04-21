import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { Product } from '@/types/product';

const columns: Column<Product>[] = [
    {
        header: 'Product Details',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground truncate">{item.brand} {item.model ? `| ${item.model}` : ''}</span>
            </div>
        ),
    },

    {
        header: 'Category',
        accessor: (item) => item.category,
                className: "w-1/10"

    },
    {
        header: 'Price',
        accessor: (item) => item.unit_price,
        className: "w-1/10"
    },
    {
        header: 'Stock',
        accessor: (item) => item.stock_quantity,
        className: "w-1/10"
    },

    {
        header: 'Supplier',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.supplier_name}</span>
                <span className="text-xs text-muted-foreground truncate">{item.source ? item.source : ''}</span>
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
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                        <Link href={route('products.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('products.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Product?"
                        description={`This action cannot be undone. Product "${item.name}" will be permanently removed.`}
                        onConfirm={() => handleDelete(item.id, 'products.destroy', {
                            redirectTo: 'products.index',
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
