import AppLayout from '@/layouts/app-layout';
import { PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';

interface Props {
    companies: PaginationType<any>;
}

export default function CompanyIndex({ companies }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Companies', href: route('companies.index') },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Companies | CVS CRM" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Companies (${companies.total})`}
                    description="Manage organizational data for your clients."
                />

                <CommonTable
                    data={companies}
                    columns={columns}
                    create_route="companies.create"
                    routeName="companies.index"
                    sortOptions={sortOptions}
                />
            </div>
        </AppLayout>
    );
}
