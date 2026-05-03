import { Building2, Phone, MapPin } from 'lucide-react';
import type { Column } from '@/types';
import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';

const CUSTOMER_STATUS_OPTIONS = [
    { value: 'active', label: 'Active', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'inactive', label: 'Inactive', colorClass: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
];

const columns: Column<Customer>[] = [
    {
        header: 'Customer',
        accessor: (item) => (
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
        accessor: (item) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">{item.company?.name || 'N/A'}</span>

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
        accessor: (item) => (
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
                <span className="text-xs text-muted-foreground truncate">{item.email}</span>
            </div>
        ),
        className: 'w-[15%]',
    },
    {
        header: 'Assigned To',
        accessor: (item) => (
            <div className="flex items-center gap-2">
                {item.assigned_user ? (
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium truncate">{item.assigned_user.name}</span>
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
        accessor: (item) => (
            <div className='flex flex-col gap-2'>
                <InlineStatusUpdate
                    id={item.id}
                    currentStatus={item.status}
                    routeName="customers.update-status"
                    options={CUSTOMER_STATUS_OPTIONS}
                />

                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 capitalize font-normal w-fit">
                    {item.type}
                </Badge>
            </div>
        ),
        className: 'w-[10%]',
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="customers"
                label="Customer"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
