import AppLayout from '@/layouts/app-layout';
import { CustomerType, FilterOption, FollowUp, PaginationType, Requirement, SortOption } from '@/types';
import { SelectOption } from '@/types/lookup';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { getColumns } from './Columns';
import { useModal } from '@/contexts/ModalContext';

interface Props {
    followUps: PaginationType<FollowUp>;
    stats: Record<string, number>;
    customers: SelectOption[];
    requirements: SelectOption[];
}

export default function FollowUpIndex({ followUps, stats, customers, requirements }: Props) {
    const { openModal } = useModal();
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Follow Ups', href: route('follow-ups.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'searchSelect',
            options: customers
        },
        {
            name: 'requirement_id',
            label: 'Requirement',
            type: 'searchSelect',
            options: requirements
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
                    columns={getColumns(openModal, customers, requirements)}
                    create_route="follow-ups.create"
                    routeName="follow-ups.index"
                    filters={filters}
                    sortOptions={sortOptions}
                    exportRoute="follow-ups.export"
                    printRoute="follow-ups.print"
                    bulkDeleteRoute="follow-ups.bulkDestroy"
                    entityName="Follow Up"
                />
            </div>
        </AppLayout>
    );
}
