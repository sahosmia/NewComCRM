import AppLayout from "@/layouts/app-layout";
import ProductForm from "./form";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Products", href: route('products.index') }, { label: "Edit" }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Product</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <ProductForm product={product} />
                </div>
            </div>
        </AppLayout>
    );
}
