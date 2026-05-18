import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { Product } from '@/types';


interface Props {
    products: PaginationType<Product>;
}

const BREADCRUMBS = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Products', href: route('products.index') },
];

const SORT_OPTIONS: SortOption[] = [
    { label: 'Newest First', sort: 'created_at', direction: 'desc' },
    { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
    { label: 'Price (Low to High)', sort: 'unit_price', direction: 'asc' },
    { label: 'Price (High to Low)', sort: 'unit_price', direction: 'desc' },
];

export default function ProductIndex({ products }: Props) {
    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Products" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Products (${products.total})`}
                    description="Manage your inventory and product catalog."
                />

                <CommonTable
                    data={products}
                    columns={columns}
                    dataKey='products'
                    entityName='Product'
                    sortOptions={SORT_OPTIONS}
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
