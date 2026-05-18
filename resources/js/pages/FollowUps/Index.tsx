import AppLayout from '@/layouts/app-layout';
import { FilterOption, FollowUp, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';


interface Props {
    followUps: PaginationType<FollowUp>;
    stats: Record<string, number>;
}

const BREADCRUMBS = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Follow Ups', href: route('follow-ups.index') },
];

const FILTERS: FilterOption[] = [
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
    {
        name: 'date_range',
        label: 'Date Range',
        type: 'date_range',
    },
];

const SORT_OPTIONS: SortOption[] = [
    { label: 'Newest First', sort: 'created_at', direction: 'desc' },
    { label: 'Follow Up Date', sort: 'follow_up_date', direction: 'asc' },
    { label: 'Priority', sort: 'priority', direction: 'desc' },
];

export default function FollowUpIndex({ followUps, stats }: Props) {
    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
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
                    filters={FILTERS}
                    sortOptions={SORT_OPTIONS}
                    exportRoute="follow-ups.export"
                    printRoute="follow-ups.print"
                    bulkDeleteRoute="follow-ups.bulkDestroy"
                    entityName="Follow Up"
                />
            </div>
        </AppLayout>
    );
}
