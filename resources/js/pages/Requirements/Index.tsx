import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption, Requirement, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { useMemo } from 'react';

interface Props {
    requirements: PaginationType<Requirement>;
}

export default function RequirementIndex({ requirements }: Props) {
    const BREADCRUMBS: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Requirements', href: route('requirements.index') },
    ];
    const filters: FilterOption[] = useMemo(() => [
        // Add filters if needed
    ], []);

    const sortOptions: SortOption[] = useMemo(() => [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Quantity', sort: 'quantity', direction: 'desc' },
        { label: 'Total Price', sort: 'total_price', direction: 'desc' },
    ], []);

    const pageTitle = "Requirements Tracking | CRM";

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title={pageTitle} />

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
                />
            </div>
        </AppLayout>
    );
}
