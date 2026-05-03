import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';

interface Props {
    quotations: PaginationType<any>;
    stats: any;
}

export default function QuotationIndex({ quotations, stats }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Quotations', href: route('quotations.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Sent', value: 'sent' },
                { label: 'Accepted', value: 'accepted' },
                { label: 'Rejected', value: 'rejected' },
                { label: 'Expired', value: 'expired' },
            ]
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Date', sort: 'quotation_date', direction: 'desc' },
        { label: 'Total Amount', sort: 'total', direction: 'desc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotations" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Quotations (${quotations.total})`}
                    description="Generate and manage customer quotations."
                />

                <CommonTable
                    data={quotations}
                    columns={columns}
                    create_route="quotations.create"
                    routeName="quotations.index"
                    filters={filters}
                    sortOptions={sortOptions}
                    bulkDeleteRoute="quotations.bulkDestroy"
                    entityName="Quotation"
                />
            </div>
        </AppLayout>
    );
}
