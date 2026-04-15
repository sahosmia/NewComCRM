import AppLayout from '@/layouts/app-layout';
import { FilterOption, PaginationType, SortOption, Product, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './Columns';
import { useMemo } from 'react';

interface Props {
    products: PaginationType<Product>;
}

export default function ProductIndex({ products }: Props) {
    const BREADCRUMBS: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Products', href: route('products.index') },
    ];
    const filters: FilterOption[] = useMemo(() => [
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { label: 'General', value: 'general' },
            ]
        },
    ], []);

    const sortOptions: SortOption[] = useMemo(() => [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Price (Low to High)', sort: 'unit_price', direction: 'asc' },
        { label: 'Price (High to Low)', sort: 'unit_price', direction: 'desc' },
    ], []);

    const pageTitle = "Product Catalog | CRM";

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title={pageTitle} />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Products (${products.total})`}
                    description="Manage your inventory and product catalog."
                />

                <CommonTable
                    data={products}
                    columns={columns}
                    create_route="products.create"
                    routeName="products.index"
                    filters={filters}
                    sortOptions={sortOptions}
                />
            </div>
        </AppLayout>
    );
}
