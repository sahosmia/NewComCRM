import { Building2, Globe, Mail, Phone } from 'lucide-react';
import { TableRowActions } from '@/components/table/TableRowActions';
import type { Column, Company } from '@/types';


const columns: Column<Company>[] = [
    {
        header: 'Customer',
        accessor: (item) => (
            <div className="flex flex-col min-w-0 max-w-48">
                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />

                    <span className="font-medium text-foreground">{item.name}</span>

                </div>
                {item.website && (
                    <a
                        href={item.website.startsWith('http') ? item.website : `https://${item.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] leading-tight text-muted-foreground mt-1 hover:text-primary transition-colors"
                    >
                        <Globe className="w-3 h-3 shrink-0" />
                        <span className="truncate block">
                            {item.website.replace(/(^\w+:|^)\/\//, '')}
                        </span>
                    </a>
                )}            </div>
        ),
        className: 'w-[40%]',
    },
    {
        header: 'Contact Info',
        accessor: (item) => (
            <div className="flex flex-col gap-1 min-w-0 max-w-45">
                {item.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{item.email}</span>
                    </div>
                )}
                {item.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{item.phone}</span>
                    </div>
                )}

            </div>
        ),
        className: 'w-[40%]',
    },


    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="companies"
                label="Company"
                hideView
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
