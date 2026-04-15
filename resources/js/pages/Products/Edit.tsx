import AppLayout from "@/layouts/app-layout";
import ProductForm from "./form";

export default function Edit({ product }: any) {
    return (
        <AppLayout breadcrumbs={[{ title: "Products", href: route('products.index') }, { title: "Edit", href: route('products.edit', product.id) }]}>
            <div className="p-6 max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Edit Product</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <ProductForm product={product} />
                </div>
            </div>
        </AppLayout>
    );
}
