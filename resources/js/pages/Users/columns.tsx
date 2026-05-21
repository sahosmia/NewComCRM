import type { UserType, Column } from '@/types';
import { TableRowActions } from '@/components/table/TableRowActions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

const columns: Column<UserType>[] = [
    {
        header: 'Name',
        accessor: (item: any) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.designation}</span>
            </div>
        ),
    },
    {

        header: 'Signature',
        accessor: (item: any) => (
            <div className="flex items-center gap-2">
                {item.signature_url ? (
                    <img src={item.signature_url} alt="Signature" className="h-8 w-16 object-contain border rounded bg-white" />
                ) : (
                    <span className="text-muted-foreground text-xs italic">No signature</span>
                )}
            </div>
        ),
    },

    {
        header: 'Contact',
        accessor: (item: any) => (
            <div className="flex flex-col text-sm">
                <span>{item.email}</span>
                <span className="text-xs text-muted-foreground">{item.phone}</span>
            </div>
        ),
    },
    {
        header: 'Role',
        accessor: (item: any) => (
            <div className="flex items-center gap-2">
                {item.role == 'user' ? "User" : "Super Admin"}
            </div>
        ),
    },

    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="users"
                label="User"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
