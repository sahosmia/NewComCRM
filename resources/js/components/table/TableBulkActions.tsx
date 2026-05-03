import { Download, MoreHorizontal, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

interface BulkActionsProps {
    selectedItems: number[] | string[];
    entityName?: string; // e.g., 'Customer' or 'Order'
    exportRoute?: string;
    printRoute?: string;
    bulkDeleteRoute?: string;
    handleExport?: () => void;
    handlePrint?: () => void;
    handleBulkDelete: (ids: any[], route: string) => void;
}

export function TableBulkActions({
    selectedItems,
    entityName,
    exportRoute,
    printRoute,
    bulkDeleteRoute,
    handleExport,
    handlePrint,
    handleBulkDelete,
}: BulkActionsProps) {

    if (selectedItems.length === 0 && !exportRoute && !printRoute && !bulkDeleteRoute) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open bulk actions</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
                {exportRoute && (
                    <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Export {selectedItems.length > 0 ? 'Selected' : 'All'}</span>
                    </DropdownMenuItem>
                )}

                {printRoute && (
                    <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
                        <Printer className="mr-2 h-4 w-4" />
                        <span>Print {selectedItems.length > 0 ? 'Selected' : 'All'}</span>
                    </DropdownMenuItem>
                )}

                {bulkDeleteRoute && (
                    <>
                        <DropdownMenuSeparator />
                        <AlertDialogDestructive
                            title={selectedItems.length > 0
                                ? `Delete ${selectedItems.length} Selected ${entityName}${selectedItems.length > 1 ? 's' : ''}?`
                                : `Delete All ${entityName}s?`}
                            description={selectedItems.length > 0
                                ? "This action cannot be undone. This will permanently delete the selected records."
                                : `This action cannot be undone. This will permanently delete ALL ${entityName}s.`}
                            onConfirm={() => handleBulkDelete(selectedItems, bulkDeleteRoute)}
                        >
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600 focus:text-red-600 cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>{selectedItems.length > 0 ? `Delete Selected (${selectedItems.length})` : 'Delete All'}</span>
                            </DropdownMenuItem>
                        </AlertDialogDestructive>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
