import AppLayout from '@/layouts/app-layout';
import { PaginationType } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { Badge } from '@/components/ui/badge';

interface Props {
    sales: PaginationType<any>;
}

const columns: any[] = [
    {
        header: 'Customer',
        accessor: (item: any) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.customer?.name}</span>
                <span className="text-xs text-muted-foreground">{item.customer?.company_name}</span>
            </div>
        ),
    },
    {
        header: 'Products',
        accessor: (item: any) => (
            <div className="flex flex-wrap gap-1 max-w-62">
                {item.requirement?.items?.map((row: any) => (
                    <Badge key={row.id} variant="secondary" className="text-[10px] font-normal">
                        {row.product?.name} x {row.quantity}
                    </Badge>
                ))}
            </div>
        ),
    },
    {
        header: 'Amount',
        accessor: (item: any) => (
            <div className="font-bold">
                BDT {parseFloat(item.amount).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Sale Date',
        accessor: (item: any) => new Date(item.sale_date).toLocaleDateString(),
    },
];

export default function SaleIndex({ sales }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Sales', href: route('sales.index') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Sales History (${sales.total})`}
                    description="Automatically recorded sales from purchased requirements."
                />

                <CommonTable
                    data={sales}
                    columns={columns}
                    routeName="sales.index"
                    exportRoute="sales.export"
                    printRoute="sales.print"
                />
            </div>
        </AppLayout>
    );
}
