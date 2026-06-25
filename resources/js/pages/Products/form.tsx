import { useForm } from "@inertiajs/react";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import FormLabel from "@/components/admin/form/FormLabel";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useModal } from "@/contexts/ModalContext";
import type { Product, Unit } from "@/types";


interface Props {
    product?: Product;
    units?: Unit[];
}

export default function ProductForm({ product, units = [] }: Props) {
    const { openModal } = useModal();
        const [localUnits, setLocalUnits] = useState<Unit[]>(units);


    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        unit_price: product?.unit_price || "",
        costing_price: product?.costing_price || "",
        category: product?.category || "",
        stock_quantity: product?.stock_quantity || "",
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
                    <FormLabel required>Product Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="e.g. Rosenberger Optical Patch Cord"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    <ErrorMessage message={errors.name} />

                </div>






                {/* Costing Price */}
                <div className="space-y-2">
                    <FormLabel>Costing Price</FormLabel>
                    <Input
                        id="costing_price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={data.costing_price}
                        onChange={(e) => setData("costing_price", e.target.value)}
                    />
                    <ErrorMessage message={errors.costing_price} />
                </div>

                {/* Sale Price */}
                <div className="space-y-2">
                    <FormLabel>Sale Price</FormLabel>
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
                    <FormLabel>Stock Quantity</FormLabel>
                    <Input
                        id="stock_quantity"
                        type="number"
                        placeholder="0"
                        value={data.stock_quantity}
                        onChange={(e) => setData("stock_quantity", parseInt(e.target.value) || "")}
                    />
                    <ErrorMessage message={errors.stock_quantity} />

                </div>

                {/* Category */}
                <div className="space-y-2">
                    <FormLabel>Category</FormLabel>
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
                    <FormLabel>Supplier Name</FormLabel>
                    <Input
                        id="supplier_name"
                        placeholder="Main Supplier"
                        value={data.supplier_name}
                        onChange={(e) => setData("supplier_name", e.target.value)}
                    />
                    <ErrorMessage message={errors.supplier_name} />

                </div>



                {/* Unit */}
                {/* <div className="space-y-2">
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
                </div> */}

                <div className="space-y-2">
                    <GenericCombobox
                        required
                        label="Unit"
                        items={localUnits.map(unit => ({
                            id: unit.id,
                            name: unit.short_form ? `${unit.title} (${unit.short_form})` : unit.title
                        }))}
                        selectedId={data.unit_id}
                        onSelect={(id) => setData("unit_id", id as number)}
                        placeholder="Select a unit"
                        searchPlaceholder="Search customers..."
                        allowManualInput={false}
                        error={errors.unit_id}
                        renderAction={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('CREATE_UNIT', {
                                        onSuccess: (newUnit: Unit) => {
                                            setLocalUnits(prev => [...prev, newUnit]);
                                            setData("unit_id", newUnit.id);
                                        }
                                    });
                                }}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        }
                    />
                </div>
            </div>

            {/* Source / Purchase Info */}
            <div className="space-y-2">
                <FormLabel>Source / Purchase From</FormLabel>
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
                <FormLabel>Description</FormLabel>
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
