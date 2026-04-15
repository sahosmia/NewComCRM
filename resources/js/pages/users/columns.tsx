import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { User, Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

export const columns: Column<User>[] = [
    {
        header: 'Name',
        accessor: (item: User) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
            </div>
        ),
    },

    {
        header: 'Email',
        accessor: (item: User) => (
            <div className="flex flex-col text-sm">
                {item.email}
            </div>
        ),
    },
    {
        header: 'Role',
        accessor: (item: User) => (
            <div className="flex items-center gap-2">
                {item.role === 'user' ? "User" : "Super Admin"}
            </div>
        ),
    },

    {
        header: '',
        accessor: (item: User) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                        <Link href={route('users.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('users.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete User?"
                        description={`This action cannot be undone. All data for ${item.name} will be permanently removed.`}
                        onConfirm={() => handleDelete(item.id, 'users.destroy', {
                            redirectTo: 'users.index',
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
