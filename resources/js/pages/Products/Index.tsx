import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { Product } from '@/types/product';

interface Props {
    products: PaginationType<Product>;
}

export default function ProductIndex({ products }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Products', href: route('products.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                // Normally categories should be dynamic, but keeping it simple for now
                { label: 'General', value: 'general' },
            ]
        },
    ];

    const sortOptions: SortOption[] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Price (Low to High)', sort: 'unit_price', direction: 'asc' },
        { label: 'Price (High to Low)', sort: 'unit_price', direction: 'desc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | CVS CRM" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Products (${products.total})`}
                    description="Manage your inventory and product catalog."
                />

                <CommonTable
                    data={products}
                    columns={columns}
                    filters={filters}
                    dataKey='products'
                    entityName='Product'
                    sortOptions={sortOptions}
                    routeName="products.index"
                    create_route="products.create"
                    bulkDeleteRoute='products.bulkDestroy'
                    exportRoute="products.export"
                    printRoute="products.print"
                />
            </div>
        </AppLayout>
    );
}
