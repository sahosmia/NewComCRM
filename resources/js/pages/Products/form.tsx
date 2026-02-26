import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";

interface Props {
    product?: Product;
}

export default function ProductForm({ product }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        brand: product?.brand || "",
        unit_price: product?.unit_price || "",
        description: product?.description || "",
        category: product?.category || "",
        stock_quantity: product?.stock_quantity || 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (product) {
            put(route("products.update", product.id));
        } else {
            post(route("products.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Input
                    placeholder="Product Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
            </div>

            <div>
                <Input
                    placeholder="Brand"
                    value={data.brand}
                    onChange={(e) => setData("brand", e.target.value)}
                />
                {errors.brand && <div className="text-red-500 text-sm">{errors.brand}</div>}
            </div>

            <div>
                <Input
                    type="number"
                    step="0.01"
                    placeholder="Unit Price"
                    value={data.unit_price}
                    onChange={(e) => setData("unit_price", e.target.value)}
                />
                {errors.unit_price && <div className="text-red-500 text-sm">{errors.unit_price}</div>}
            </div>

            <div>
                <Input
                    placeholder="Category"
                    value={data.category}
                    onChange={(e) => setData("category", e.target.value)}
                />
                {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
            </div>

            <div>
                <Input
                    type="number"
                    placeholder="Stock Quantity"
                    value={data.stock_quantity}
                    onChange={(e) => setData("stock_quantity", parseInt(e.target.value) || 0)}
                />
                {errors.stock_quantity && <div className="text-red-500 text-sm">{errors.stock_quantity}</div>}
            </div>

            <div>
                <Textarea
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            <Button type="submit" disabled={processing}>
                {product ? "Update" : "Create"}
            </Button>
        </form>
    );
}
