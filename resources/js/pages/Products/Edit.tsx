import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Product, Unit, Supplier } from "@/types";
import ProductForm from "./form";

interface Props {
    product: Product;
    units: Unit[];
    suppliers: Supplier[];
}

export default function Edit({ product, units, suppliers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Products", href: route('products.index') }, { title: "Edit", href: route('products.edit', product.id) }]}>
            <Head title={`Edit ${product.name}`} />

            <div className="p-6 max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Edit Product</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <ProductForm product={product} units={units} suppliers={suppliers} />
                </div>
            </div>
        </AppLayout>
    );
}
