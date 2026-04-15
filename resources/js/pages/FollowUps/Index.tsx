import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption, FollowUp, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { useMemo } from 'react';

interface Props {
    followUps: PaginationType<FollowUp>;
    stats: {
        total: number;
        pending: number;
        completed: number;
    };
}

export default function FollowUpIndex({ followUps, stats }: Props) {
    const BREADCRUMBS: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Follow Ups', href: route('follow-ups.index') },
    ];
    const filters: FilterOption[] = useMemo(() => [
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Price Shared', value: 'price_shared' },
                { label: 'Negotiation', value: 'negotiation' },
                { label: 'Purchase', value: 'purchase' },
                { label: 'Lost', value: 'lost' },
                { label: 'Follow Up', value: 'follow_up' },
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
    ], []);

    const sortOptions: SortOption[] = useMemo(() => [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Follow Up Date', sort: 'follow_up_date', direction: 'asc' },
        { label: 'Priority', sort: 'priority', direction: 'desc' },
    ], []);

    const pageTitle = "Follow Ups Tracking | CRM";

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title={pageTitle} />

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
                />
            </div>
        </AppLayout>
    );
}
