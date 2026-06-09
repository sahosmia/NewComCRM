import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { PaginationType, SortOption } from '@/types';
import { formatDate } from '@/utils/date-format';

interface Props {
    sales: PaginationType<any>;
    filters: {
        users: any[];
        customers: any[];
    };
}

const columns: any[] = [
    {
        header: 'Customer',
        accessor: (item: any) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.customer?.name}</span>
                <span className="text-xs text-muted-foreground">{item.customer?.company?.name}</span>
            </div>
        ),
    },
    {
        header: 'Requirement',
        accessor: (item: any) => (
            <div className="font-medium text-primary">
                <Link href={route('requirements.show', item.requirement_id)}>
                    {item.requirement?.title || `REQ-${item.requirement_id}`}
                </Link>
            </div>
        ),
    },

    {
        header: 'Amount',
        accessor: (item: any) => (
            <div className="font-bold">
                BDT {parseFloat(item.amount).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Representative',
        accessor: (item: any) => (
            <div className="flex flex-col">
                {item.customer?.assigned_user ? (
                    <>
                        <span className="text-xs font-medium">{item.customer.assigned_user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{item.customer.assigned_user.email}</span>
                    </>
                ) : (
                    <span className="text-xs text-muted-foreground italic">N/A</span>
                )}
            </div>
        ),
    },
    {
        header: 'Sale Date',
        accessor: (item: any) => formatDate(item.sale_date),
    },
    {
        header: 'Actions',
        accessor: (item: any) => (
            <div className="flex items-center gap-2">
                <Link href={route('sales.show', item.id)}>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Eye className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        ),
    },
];

export default function SaleIndex({ sales, filters }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Sales', href: route('sales.index') },
    ];

    const salesSortOptions: SortOption[] = [
        { label: 'Sale Date (Newest)', sort: 'sale_date', direction: 'desc' },
        { label: 'Sale Date (Oldest)', sort: 'sale_date', direction: 'asc' },
        { label: 'Amount (Highest)', sort: 'amount', direction: 'desc' },
        { label: 'Amount (Lowest)', sort: 'amount', direction: 'asc' },
    ];

    const tableFilters = [
        {
            name: 'user_id',
            label: 'Representative',
            type: 'select' as const,
            options: filters.users.map(u => ({ label: u.name, value: u.id.toString() }))
        },
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'select' as const,
            options: filters.customers.map(c => ({ label: c.name, value: c.id.toString() }))
        },
        {
            name: 'date_range',
            label: 'Sale Date',
            type: 'date_range' as const,
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Sales History (${sales.total})`}
                    description="Automatically recorded sales from purchased requirements."
                />

                <CommonTable
                    data={sales}
                    columns={columns}
                    routeName="sales.index"
                    filters={tableFilters}
                    exportRoute="sales.export"
                    printRoute="sales.print"
                    sortOptions={salesSortOptions}
                    entityName="Sale"
                />
            </div>
        </AppLayout>
    );
}
