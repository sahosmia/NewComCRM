import AppLayout from "@/layouts/app-layout";
import ProductForm from "./form";

export default function Create() {
    return (
        <AppLayout breadcrumbs={[{ label: "Products", href: route('products.index') }, { label: "Create" }]}>
            <div className="p-6 max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Create Product</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <ProductForm />
                </div>
            </div>
        </AppLayout>
    );
}
