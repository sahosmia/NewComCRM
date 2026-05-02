import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import { Unit } from "@/types/unit";
import { Loader2 } from "lucide-react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";

interface Props {
    product?: Product;
    units?: Unit[];
}

export default function ProductForm({ product, units = [] }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        brand: product?.brand || "",
        model: product?.model || "",
        unit_price: product?.unit_price || "",
        category: product?.category || "",
        stock_quantity: product?.stock_quantity || 0,
        supplier_name: product?.supplier_name || "",
        source: product?.source || "",
        description: product?.description || "",
        unit_id: product?.unit_id || "",
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
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g. Rosenberger Optical Patch Cord"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    <ErrorMessage message={errors.name} />

                </div>

                {/* Brand */}
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                        id="brand"
                        placeholder="Brand Name"
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                    />
                    <ErrorMessage message={errors.brand} />

                </div>

                {/* Model */}
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                        id="model"
                        placeholder="Model Number"
                        value={data.model}
                        onChange={(e) => setData("model", e.target.value)}
                    />
                    <ErrorMessage message={errors.model} />

                </div>

                {/* Unit Price */}
                <div className="space-y-2">
                    <Label htmlFor="unit_price">Unit Price</Label>
                    <Input
                        id="unit_price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={data.unit_price}
                        onChange={(e) => setData("unit_price", e.target.value)}
                    />
                    <ErrorMessage message={errors.unit_price} />

                </div>

                {/* Stock Quantity */}
                <div className="space-y-2">
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                        id="stock_quantity"
                        type="number"
                        placeholder="0"
                        value={data.stock_quantity}
                        onChange={(e) => setData("stock_quantity", parseInt(e.target.value) || 0)}
                    />
                    <ErrorMessage message={errors.stock_quantity} />

                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        placeholder="Product Category"
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                    />
                    <ErrorMessage message={errors.category} />

                </div>

                {/* Supplier Name */}
                <div className="space-y-2">
                    <Label htmlFor="supplier_name">Supplier Name</Label>
                    <Input
                        id="supplier_name"
                        placeholder="Main Supplier"
                        value={data.supplier_name}
                        onChange={(e) => setData("supplier_name", e.target.value)}
                    />
                    <ErrorMessage message={errors.supplier_name} />

                </div>

                {/* Unit */}
                <div className="space-y-2">
                    <Label htmlFor="unit_id">Unit</Label>
                    <Select
                        onValueChange={(value) => setData("unit_id", value)}
                        defaultValue={data.unit_id?.toString()}
                    >
                        <SelectTrigger className={errors.unit_id ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id.toString()}>
                                    {unit.title} ({unit.short_form})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <ErrorMessage message={errors.unit_id} />
                </div>
            </div>

            {/* Source / Purchase Info */}
            <div className="space-y-2">
                <Label htmlFor="source">Source / Purchase From</Label>
                <Textarea
                    id="source"
                    placeholder="Where to buy or find this?"
                    value={data.source}
                    rows={4}
                    onChange={(e) => setData("source", e.target.value)}
                />
                <ErrorMessage message={errors.source} />

            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Product details and specifications..."
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <ErrorMessage message={errors.description} />

            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={processing} className="w-full md:w-32">
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        product ? "Update Product" : "Create Product"
                    )}
                </Button>
            </div>
        </form>
    );
}
