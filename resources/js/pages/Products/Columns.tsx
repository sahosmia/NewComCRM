import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column, Product } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

export const columns: Column<Product>[] = [
    {
        header: 'Name',
        accessor: (item: Product) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
            </div>
        ),
    },
    {
        header: 'Brand',
        accessor: (item: Product) => item.brand,
    },
    {
        header: 'Category',
        accessor: (item: Product) => typeof item.category === 'string' ? item.category : item.category?.name || 'N/A',
    },
    {
        header: 'Price',
        accessor: (item: Product) => item.unit_price,
    },
    {
        header: 'Stock',
        accessor: (item: Product) => item.stock_quantity,
    },
    {
        header: '',
        accessor: (item: Product) => (
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
