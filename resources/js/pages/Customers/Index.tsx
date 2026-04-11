import AppLayout from '@/layouts/app-layout';
import { CustomerType, PaginationType } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';



export default function CustomerIndex({ customers }: { customers: PaginationType<CustomerType> }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Customers', href: route('customers.index') },
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
                />
            </div>
        </AppLayout>
    );
}
