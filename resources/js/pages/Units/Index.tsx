import AppLayout from '@/layouts/app-layout';
import { PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { Unit } from '@/types/unit';
import { columns } from './columns';

interface Props {
    units: PaginationType<Unit>;
}

export default function UnitIndex({ units }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Units', href: route('units.index') },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Title (A-Z)', sort: 'title', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Units" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Units (${units.total})`}
                    description="Manage product units of measurement."
                />

                <CommonTable
                    data={units}
                    columns={columns}
                    dataKey='units'
                    entityName='Unit'
                    sortOptions={sortOptions}
                    routeName="units.index"
                    create_route="units.create"
                                        bulkDeleteRoute="units.bulkDestroy"

                />
            </div>
        </AppLayout>
    );
}
