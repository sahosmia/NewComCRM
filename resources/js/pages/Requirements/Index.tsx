import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import AppLayout from '@/layouts/app-layout';
import type { FilterOption, PaginationType, Requirement, SortOption } from '@/types';
import { columns } from './Columns';

import type { Company, CustomerType, User } from '@/types';

interface Props {
    requirements: PaginationType<Requirement>;
    customers: CustomerType[];
    users: User[];
    companies: Company[];
}

export default function RequirementIndex({ requirements, customers, users, companies }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Requirements', href: route('requirements.index') },
    ];




    const filters: FilterOption[] = [
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Purchased', value: 'purchased' },
                { label: 'Cancel', value: 'cancel' },
            ]
        },
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'searchSelect',
            options: customers.map(c => ({ label: c.name, value: c.id }))
        },
        {
            name: 'company_id',
            label: 'Company',
            type: 'searchSelect',
            options: companies.map(c => ({ label: c.name, value: c.id }))
        },
        {
            name: 'user_id',
            label: 'Representative',
            type: 'searchSelect',
            options: users.map(u => ({ label: u.name, value: u.id }))
        },
        {
            name: 'date_range',
            label: 'Date Range',
            type: 'date_range',
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        // { label: 'Quantity', sort: 'quantity', direction: 'desc' },
        { label: 'Total Price', sort: 'grand_total', direction: 'desc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Requirements" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Requirements (${requirements.total})`}
                    description="Track customer product requirements and needs."
                />

                <CommonTable
                    entityName='Requirement'
                    columns={columns}
                    filters={filters}
                    data={requirements}
                    sortOptions={sortOptions}
                    routeName="requirements.index"
                    printRoute="requirements.print"
                    create_route="requirements.create"
                    exportRoute="requirements.export"
                    bulkDeleteRoute='requirements.bulkDestroy'
                />
            </div>
        </AppLayout>
    );
}
