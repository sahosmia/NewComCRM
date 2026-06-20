import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { PaginationType, SortOption } from '@/types';
import { formatDate } from '@/utils/date-format';

import type { Company, CustomerType, User } from '@/types';

interface Props {
    sales: PaginationType<any>;
    customers: CustomerType[];
    users: User[];
    companies: Company[];
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
                {item.requirement?.user ? (
                    <>
                        <span className="text-xs font-medium">{item.requirement.user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{item.requirement.user.email}</span>
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

export default function SaleIndex({ sales, customers, users, companies }: Props) {
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
            type: 'searchSelect' as const,
            options: users.map(u => ({ label: u.name, value: u.id }))
        },
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'searchSelect' as const,
            options: customers.map(c => ({ label: c.name, value: c.id }))
        },
        {
            name: 'company_id',
            label: 'Company',
            type: 'searchSelect' as const,
            options: companies.map(c => ({ label: c.name, value: c.id }))
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
