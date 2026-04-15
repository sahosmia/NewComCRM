import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                        <Link href={route('meetings.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('meetings.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Meeting?"
                        description={`This action cannot be undone. Meeting "${item.title}" will be permanently removed.`}
                        onConfirm={() => handleDelete(item.id, 'meetings.destroy', {
                            redirectTo: 'meetings.index',
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
