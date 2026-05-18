import AppLayout from '@/layouts/app-layout';
import { CustomerType, FilterOption, PaginationType, SortOption, UserTypeforForm } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';
import { useMemo } from 'react';

interface Props {
    customers: PaginationType<CustomerType>;
    users: UserTypeforForm[];
    companies: { id: number; name: string }[];
}



const BREADCRUMBS = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Customers', href: route('customers.index') },
];

const SORT_OPTIONS: SortOption[] = [
    { label: 'Newest First', sort: 'created_at', direction: 'desc' },
    { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
    { label: 'Email', sort: 'email', direction: 'asc' },
];

export default function CustomerIndex({ customers, users, companies }: Props) {
    const filters: FilterOption[] = useMemo(() => [
        {
            name: 'company_id',
            label: 'Company',
            type: 'searchSelect',
            options: companies.map((company) => ({
                label: company.name,
                value: company.id,
            }))
        },
        {
            name: 'assigned_to',
            label: 'Assigned To',
            type: 'searchSelect',
            options: users.map((user) => ({
                label: user.name,
                value: user.id,
            }))
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ]
        },
        {
            name: 'type',
            label: 'Customer Type',
            type: 'select',
            options: [
                { label: 'Corporate', value: 'corporate' },
                { label: 'Reseller', value: 'reseller' },
                { label: 'Personal', value: 'personal' },
            ]
        },

        {
            name: 'date',
            label: 'Created Date',
            type: 'date',
        },

        {
            name: 'date_range',
            label: 'Created Date',
            type: 'date_range',
        }
    ], [companies, users]);

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Customers" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Customers (${customers.total})`}
                    description="Manage your client base, contact information, and account status."
                />

                <CommonTable
                    data={customers}
                    columns={columns}
                    create_route="customers.create"
                    routeName="customers.index"
                    filters={filters}
                    sortOptions={SORT_OPTIONS}
                    exportRoute="customers.export"
                    printRoute="customers.print"
                    bulkDeleteRoute="customers.bulkDestroy"
                    entityName="Customer"
                />
            </div>
        </AppLayout>
    );
}
