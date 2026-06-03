import AppLayout from '@/layouts/app-layout';
import { FilterOption, Meeting, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { getColumns } from './Columns';
import { useModal } from '@/contexts/ModalContext';

interface Props {
    meetings: PaginationType<Meeting>;
    customers: { id: number; name: string }[];
    requirements: { id: number; title: string }[];
}

export default function MeetingIndex({ meetings, customers, requirements }: Props) {
    const { openModal } = useModal();
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Meetings', href: route('meetings.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'select',
            options: customers.map(c => ({ label: c.name, value: c.id.toString() }))
        },
        {
            name: 'requirement_id',
            label: 'Requirement',
            type: 'select',
            options: requirements.map(r => ({ label: r.title, value: r.id.toString() }))
        },
        {
            name: 'period',
            label: 'Period',
            type: 'select',
            options: [
                { label: 'Today', value: 'today' },
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Overdue', value: 'overdue' },
            ]
        },
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
        {
            name: 'date_range',
            label: 'Date Range',
            type: 'date_range',
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Schedule Date Time', sort: 'scheduled_at', direction: 'asc' },
        { label: 'Title', sort: 'title', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meetings" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Meetings (${meetings.total})`}
                    description="Schedule and manage client meetings and follow-ups."
                />

                <CommonTable
                    data={meetings}
                    columns={getColumns(openModal)}
                    create_route="meetings.create"
                    routeName="meetings.index"
                    filters={filters}
                    sortOptions={sortOptions}
                    exportRoute="meetings.export"
                    printRoute="meetings.print"
                    bulkDeleteRoute="meetings.bulkDestroy"
                    entityName="Meeting"
                />
            </div>
        </AppLayout>
    );
}
