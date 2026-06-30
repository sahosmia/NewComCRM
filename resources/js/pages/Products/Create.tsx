import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Unit, Supplier } from "@/types";
import ProductForm from "./form";

interface Props {
    units: Unit[];
    suppliers: Supplier[];
}

export default function Create({ units, suppliers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Products", href: route('products.index') }, { title: "Create", href: route('products.create') }]}>
            <Head title="Create Product" />

            <div className="p-6 max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Create Product</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <ProductForm units={units} suppliers={suppliers} />
                </div>
            </div>
        </AppLayout>
    );
}
