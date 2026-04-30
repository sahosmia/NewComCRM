import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';

interface Props {
    requirements: PaginationType<any>;
}

export default function RequirementIndex({ requirements }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Requirements', href: route('requirements.index') },
    ];


    const filters: FilterOption[] = [
        // Add filters if needed
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Quantity', sort: 'quantity', direction: 'desc' },
        { label: 'Total Price', sort: 'total_price', direction: 'desc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Requirements | CVS CRM" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Requirements (${requirements.total})`}
                    description="Track customer product requirements and needs."
                />

                <CommonTable
                    data={requirements}
                    columns={columns}
                    create_route="requirements.create"
                    routeName="requirements.index"
                    filters={filters}
                    sortOptions={sortOptions}
                    exportRoute="requirements.export"
                    printRoute="requirements.print"
                />
            </div>
        </AppLayout>
    );
}
