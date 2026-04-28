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
            </div>
        ),
    },

    {
        header: 'Email',
        accessor: (item: any) => (
            <div className="flex flex-col text-sm">
                {item.email}
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
