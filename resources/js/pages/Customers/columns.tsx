import { Link } from '@inertiajs/react';
import { Building2, FileText, MoreHorizontal, Phone, SquarePen, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Customer, Column } from '@/types';
import { handleDelete } from '@/utils/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { cn } from '@/lib/utils';

export const columns: Column<Customer>[] = [
    {
        header: 'Customer',
        accessor: (item: Customer) => (
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.designation || 'No Designation'}</span>
            </div>
        ),
        className: 'w-[25%]',
    },
    {
        header: 'Company',
        accessor: (item: Customer) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">{item.company_name}</span>
                </div>
                {item.addresses && item.addresses[0] && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="w-3 h-3" /><span className="truncate">{item.addresses[0]}</span>
                    </div>
                )}
            </div>
        ),
        className: 'w-[20%]',
    },
    {
        header: 'Contact',
        accessor: (item: Customer) => (
            <div className="flex flex-col text-sm">
                <div className="flex items-center gap-1 font-medium">
                    <Phone className="w-3 h-3" />
                    {item.phones && item.phones[0] ? item.phones[0] : 'N/A'}
                    {item.phones && item.phones.length > 1 && (
                        <span className="text-[10px] bg-muted px-1 rounded text-muted-foreground">
                            +{item.phones.length - 1}
                        </span>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">{item.email}</span>
            </div>
        ),
        className: 'w-[15%]',
    },
    {
        header: 'Assigned To',
        accessor: (item: Customer) => (
            <div className="flex items-center gap-2">
                {item.assigned_user ? (
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary border border-primary/20">
                            {item.assigned_user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{item.assigned_user.name}</span>
                    </div>
                ) : (
                    <span className="text-xs text-muted-foreground italic">Unassigned</span>
                )}
            </div>
        ),
        className: 'w-[16%]',
    },
    {
        header: 'Status',
        accessor: (item: Customer) => (
            <div className='flex flex-col gap-2'>
                <Badge
                    variant={item.status === 'active' ? 'default' : 'secondary'}
                    className={cn(
                        "capitalize text-[10px] px-1 py-0 h-4",
                        item.status === 'active' ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20" : ""
                    )}
                >
                    {item.status}
                </Badge>

                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 capitalize font-normal">
                    {item.type}
                </Badge>
            </div>
        ),
        className: 'w-[10%]',
    },
    {
        header: '',
        accessor: (item: Customer) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                        <Link href={route('customers.show', item.id)}>
                            <FileText className="w-4 h-4 mr-2" /> View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('customers.edit', item.id)}>
                            <SquarePen className="w-4 h-4 mr-2" /> Edit Info
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogDestructive
                        title="Delete Customer?"
                        description={`This action cannot be undone. All data for ${item.name} will be permanently removed.`}
                        onConfirm={() => handleDelete(item.id, 'customers.destroy', {
                            redirectTo: 'customers.index',
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
