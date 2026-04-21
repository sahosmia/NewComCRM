import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";

export default function Show({ product }: any) {
    return (
        <AppLayout breadcrumbs={[{ title: "Products", href: route('products.index') }, { title: product.name, href: route('products.show', product.id) }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <Link href={route("products.edit", product.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                </div>

                <div className="bg-card p-6 border rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Specifications</h3>
                        <div className="mt-2 space-y-3">
                            <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
                            <p><strong>Model:</strong> {product.model || "N/A"}</p>
                            <p><strong>Category:</strong> {product.category || "N/A"}</p>
                            <p><strong>Supplier:</strong> {product.supplier_name || "N/A"}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Inventory & Pricing</h3>
                        <div className="mt-2 space-y-3">
                            <p><strong>Unit Price:</strong> ৳ {product.unit_price}</p>
                            <p><strong>Stock:</strong> {product.stock_quantity} units</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                        <p className="text-sm whitespace-pre-wrap">{product.description || "No description."}</p>
                    </div>

                    <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1 font-bold text-blue-600">Purchase Source</h3>
                        <p className="text-sm italic bg-blue-50 p-3 rounded border border-blue-100">{product.source || "No source info added."}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
