import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { FollowUpStatusUpdate } from './StatusUpdate';

const columns: Column<any>[] = [
    {
        header: 'Customer',
        accessor: (item) => item.customer?.name,
    },
    {
        header: 'Follow Up Date',
        accessor: (item) => new Date(item.follow_up_date).toLocaleDateString(),
    },
    {
        header: 'Status',
        accessor: (item) => (
            <FollowUpStatusUpdate followUp={item} />
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
                        <Link href={route('follow-ups.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('follow-ups.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Follow Up?"
                        description="This action cannot be undone. This follow up will be permanently removed."
                        onConfirm={() => handleDelete(item.id, 'follow-ups.destroy', {
                            redirectTo: 'follow-ups.index',
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
