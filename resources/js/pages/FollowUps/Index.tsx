import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';

interface Props {
    followUps: PaginationType<any>;
    stats: any;
}

export default function FollowUpIndex({ followUps, stats }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Follow Ups', href: route('follow-ups.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Done', value: 'done' },
            ]
        },
        {
            name: 'priority',
            label: 'Priority',
            type: 'select',
            options: [
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
            ]
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Follow Up Date', sort: 'follow_up_date', direction: 'asc' },
        { label: 'Priority', sort: 'priority', direction: 'desc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Follow Ups" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Follow Ups (${followUps.total})`}
                    description="Manage customer follow-ups and engagement status."
                />

                <CommonTable
                    data={followUps}
                    columns={columns}
                    create_route="follow-ups.create"
                    routeName="follow-ups.index"
                    filters={filters}
                    sortOptions={sortOptions}
                    exportRoute="follow-ups.export"
                    printRoute="follow-ups.print"
                />
            </div>
        </AppLayout>
    );
}
