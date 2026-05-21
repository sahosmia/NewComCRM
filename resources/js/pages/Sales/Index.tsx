import AppLayout from '@/layouts/app-layout';
import { PaginationType, SortOption, FilterOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/date-format';

interface Props {
    sales: PaginationType<any>;
    customers: { id: number, name: string }[];
    users: { id: number, name: string }[];
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
        header: 'Products',
        accessor: (item: any) => (
            <div className="flex flex-wrap gap-1 max-w-62">
                {item.requirement?.items?.map((row: any) => (
                    <Badge key={row.id} variant="secondary" className="text-[10px] font-normal">
                        {row.product?.name} x {row.quantity}
                    </Badge>
                ))}
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
];

export default function SaleIndex({ sales, customers, users }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Sales', href: route('sales.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'searchSelect',
            options: customers.map(c => ({ label: c.name, value: c.id }))
        },
        {
            name: 'assigned_to',
            label: 'Representative',
            type: 'searchSelect',
            options: users.map(u => ({ label: u.name, value: u.id }))
        },
        {
            name: 'date_range',
            label: 'Sale Date Range',
            type: 'date_range'
        }
    ];

    const salesSortOptions: SortOption[] = [
        { label: 'Date (Newest)', sort: 'sale_date', direction: 'desc' },
        { label: 'Date (Oldest)', sort: 'sale_date', direction: 'asc' },
        { label: 'Amount (High to Low)', sort: 'amount', direction: 'desc' },
        { label: 'Amount (Low to High)', sort: 'amount', direction: 'asc' },
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
                    filters={filters}
                    sortOptions={salesSortOptions}
                    exportRoute="sales.export"
                    printRoute="sales.print"
                    bulkDeleteRoute="sales.bulkDestroy"
                    entityName="Sale"
                />
            </div>
        </AppLayout>
    );
}
