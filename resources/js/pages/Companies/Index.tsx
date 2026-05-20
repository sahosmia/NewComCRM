import AppLayout from '@/layouts/app-layout';
import { Company, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';


interface Props {
    companies: PaginationType<Company>;
}

const BREADCRUMBS = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Companies', href: route('companies.index') },
];

const SORT_OPTIONS: SortOption[] = [
    { label: 'Newest First', sort: 'created_at', direction: 'desc' },
    { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
];

export default function CompanyIndex({ companies }: Props) {
    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Companies" />

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
                    sortOptions={SORT_OPTIONS}
                    bulkDeleteRoute="companies.bulkDestroy"
                    entityName="Company"
                />
            </div>
        </AppLayout>
    );
}
