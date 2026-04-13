import AppLayout from '@/layouts/app-layout';
import { CustomerType, FilterOption, PaginationType, SortOption, UserTypeforForm } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';

interface Props {
    customers: PaginationType<CustomerType>;
    users: UserTypeforForm[];
}



export default function CustomerIndex({ customers, users }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Customers', href: route('customers.index') },
    ];

    const filters: FilterOption[] = [
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
    ];

    const customerSortOptions :SortOption [] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Email', sort: 'email', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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
                    sortOptions={customerSortOptions}
                />
            </div>
        </AppLayout>
    );
}
