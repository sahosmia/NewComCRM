import { Link } from '@inertiajs/react';
import { Building2, Globe, Mail, Phone, MapPin } from 'lucide-react';
import type { Column } from '@/types';
import { TableRowActions } from '@/components/table/TableRowActions';

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
            <div className="flex items-start gap-2 text-sm max-w-50">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="truncate whitespace-normal line-clamp-2">{item.address || 'N/A'}</span>
            </div>
        ),
        className: 'w-[30%]',
    },
    {
        header: '',
        accessor: (item: any) => (
            <TableRowActions
                item={item}
                resource="companies"
                label="Company"
                hideView
            />
        ),
        className: 'w-[10%]',
    },
];

export { columns };
