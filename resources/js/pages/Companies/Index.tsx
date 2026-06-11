import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import AppLayout from '@/layouts/app-layout';
import type { Company, PaginationType, SortOption } from '@/types';
import { columns } from './columns';

interface Props {

    companies: PaginationType<Company>;
}



export default function CustomerIndex({ companies }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Customers', href: route('customers.index') },
    ];
console.log(companies);


    const customerSortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Email', sort: 'email', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Company (${companies.total})`}
                    description="Manage your client base, contact information, and account status."
                />

                <CommonTable
                    data={companies}
                    columns={columns}                    dataKey='companies'

                    entityName="Company"
                    sortOptions={customerSortOptions}
                    routeName="companies.index"
                    create_route="companies.create"
                    bulkDeleteRoute="companies.bulkDestroy"

                    // importRoute="companies.import"
                />
            </div>
        </AppLayout>
    );
}
