import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import AppLayout from '@/layouts/app-layout';
import { columns } from './Columns';
import type { CustomerType, FilterOption, FollowUp, PaginationType, Requirement, SortOption, User } from '@/types';

interface Props {
    followUps: PaginationType<FollowUp>;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
}

export default function FollowUpIndex({ followUps, customers, requirements, users }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Follow Ups', href: route('follow-ups.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'user_id',
            label: 'Representative',
            type: 'searchSelect',
            options: users.map(u => ({ label: u.name, value: u.id.toString() }))
        },
        {
            name: 'customer_id',
            label: 'Customer',
            type: 'searchSelect',
            options: customers.map(c => ({ label: c.name, value: c.id.toString() }))
        },
        {
            name: 'requirement_id',
            label: 'Requirement',
            type: 'searchSelect',
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
                    columns={columns}
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
