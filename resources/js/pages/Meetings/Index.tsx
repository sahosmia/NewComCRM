import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption, Meeting, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { useMemo } from 'react';

interface Props {
    meetings: PaginationType<Meeting>;
}

export default function MeetingIndex({ meetings }: Props) {
    const BREADCRUMBS: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Meetings', href: route('meetings.index') },
    ];
    const filters: FilterOption[] = useMemo(() => [
        {
            name: 'meeting_type',
            label: 'Meeting Type',
            type: 'select',
            options: [
                { label: 'Physical', value: 'physical' },
                { label: 'Virtual', value: 'virtual' },
                { label: 'Phone', value: 'phone' },
            ]
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
            ]
        },
    ], []);

    const sortOptions: SortOption[] = useMemo(() => [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Start Time', sort: 'start_time', direction: 'asc' },
        { label: 'Title', sort: 'title', direction: 'asc' },
    ], []);

    const pageTitle = "Meetings Management | CRM";

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title={pageTitle} />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Meetings (${meetings.total})`}
                    description="Schedule and manage client meetings and follow-ups."
                />

                <CommonTable
                    data={meetings}
                    columns={columns}
                    create_route="meetings.create"
                    routeName="meetings.index"
                    filters={filters}
                    sortOptions={sortOptions}
                />
            </div>
        </AppLayout>
    );
}
