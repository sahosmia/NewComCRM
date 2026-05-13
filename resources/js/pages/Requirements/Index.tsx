import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, Requirement, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';

interface Props {
    requirements: PaginationType<Requirement>;
}

export default function RequirementIndex({ requirements }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Requirements', href: route('requirements.index') },
    ];


    const filters: FilterOption[] = [
        {
            name: 'date_range',
            label: 'Date Range',
            type: 'date_range',
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Quantity', sort: 'quantity', direction: 'desc' },
        { label: 'Total Price', sort: 'total_price', direction: 'desc' },
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
