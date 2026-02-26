import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Products", href: route('products.index') }, { label: product.name }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <Link href={route("products.edit", product.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                </div>

                <div className="bg-card p-6 border rounded-lg shadow-sm space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Brand</h3>
                        <p>{product.brand || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                        <p>{product.category || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Unit Price</h3>
                        <p>${product.unit_price}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Stock Quantity</h3>
                        <p>{product.stock_quantity}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="whitespace-pre-wrap">{product.description || "No description provided."}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
