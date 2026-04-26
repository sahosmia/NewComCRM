import { Link } from '@inertiajs/react';
import { Building2, Globe, Mail, MoreHorizontal, Phone, SquarePen, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';

const columns: Column<any>[] = [
    {
        header: 'Company Name',
        accessor: (item: any) => (
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.name}</span>
                </div>
                {item.website && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Globe className="w-3 h-3" />
                        <span className="truncate">{item.website}</span>
                    </div>
                )}
            </div>
        ),
        className: 'w-[30%]',
    },
    {
        header: 'Contact Info',
        accessor: (item: any) => (
            <div className="flex flex-col text-sm gap-1">
                {item.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{item.email}</span>
                    </div>
                )}
                {item.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{item.phone}</span>
                    </div>
                )}
            </div>
        ),
        className: 'w-[30%]',
    },
    {
        header: 'Address',
        accessor: (item: any) => (
            <div className="flex items-start gap-2 text-sm max-w-[200px]">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="truncate whitespace-normal line-clamp-2">{item.address || 'N/A'}</span>
            </div>
        ),
        className: 'w-[30%]',
    },
    {
        header: '',
        accessor: (item: any) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                        <Link href={route('companies.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Company
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Company?"
                        description={`This action cannot be undone. All data for ${item.name} will be permanently removed.`}
                        onConfirm={() => handleDelete(item.id, 'companies.destroy', {
                            redirectTo: 'companies.index',
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
        className: 'w-[10%]',
    },
];

export { columns };
