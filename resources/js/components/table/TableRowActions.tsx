import { Link } from '@inertiajs/react';
import { FileText, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { handleDelete } from '@/utils/table';

interface RowActionsProps<T extends { id: number | string; name?: string }> {
    item: T;
    resource: string; // e.g., 'customers'
    label?: string;    // Display name for delete dialog
    hideView?: boolean;
    hideEdit?: boolean;
    hideDelete?: boolean;
    // For extra custom menus like "Change Password" or "Download Invoice"
    customActions?: React.ReactNode;
}

export function TableRowActions<T extends { id: number | string; name?: string }>({
    item,
    resource,
    label = "Item",
    hideView = false,
    hideEdit = false,
    hideDelete = false,
    customActions,
}: RowActionsProps<T>) {
    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">

                    {!hideView && (
                        <DropdownMenuItem asChild>
                            <Link href={route(`${resource}.show`, item.id)}>
                                <FileText className="w-4 h-4 mr-2" /> View Details
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {!hideEdit && (
                        <DropdownMenuItem asChild>
                            <Link href={route(`${resource}.edit`, item.id)}>
                                <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {/* Inject custom actions here (e.g. "Send Email", "Reset") */}
                    {customActions}

                    {!hideDelete && (
                        <>
                            <DropdownMenuSeparator />
                            <AlertDialogDestructive
                                title={`Delete ${label}?`}
                                description={`This action cannot be undone. All data for ${item.name || 'this item'} will be permanently removed.`}
                                onConfirm={() => handleDelete(item.id, `${resource}.destroy`, {
                                    redirectTo: `${resource}.index`,
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
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
