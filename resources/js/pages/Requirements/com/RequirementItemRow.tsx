import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Product, Unit } from "@/types";
import FormLabel from "@/components/admin/form/FormLabel";
import { useModal } from "@/contexts/ModalContext";

interface ItemRowProps {
    index: number;
    item: any;
    products: Product[];
    aitFactor: number;
    onItemChange: (index: number, field: any, value: any, productFallback?: Product) => void;
    onRemove: (index: number) => void;
    isRemoveDisabled: boolean;
    errors: any;
    units: Unit[];
    onProductCreated?: (product: Product) => void;
}

export const RequirementItemRow = ({ index, item, products, aitFactor, onItemChange, onRemove, isRemoveDisabled, errors, units, onProductCreated }: ItemRowProps) => {
    const { openModal } = useModal();
    const calculateGross = () => (parseFloat(item.unit_price) || 0) * aitFactor;
    const calculateTotal = () => ((parseFloat(item.unit_price) || 0) * (item.quantity || 0) * aitFactor);

    // Helpers to extract error presence for field-specific conditional classes
    const productIdError = errors && errors[`items.${index}.product_id`];
    const descriptionError = errors && errors[`items.${index}.description`];
    const quantityError = errors && errors[`items.${index}.quantity`];
    const unitPriceError = errors && errors[`items.${index}.unit_price`];
    const costingPriceError = errors && errors[`items.${index}.costing_price`];

    return (
        <div className={`group relative bg-white border rounded-xl p-4 md:p-6 transition-all hover:shadow-lg mb-6 ${
            errors && Object.keys(errors).some(key => key.startsWith(`items.${index}.`))
                ? 'border-destructive/40 bg-destructive/[0.01] shadow-sm shadow-destructive/5'
                : 'border-slate-200 hover:border-primary/40'
        }`}>

            {/* Remove Row Button */}
            <div className="absolute -top-3 -right-3 z-10">
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className={`h-8 w-8 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ${isRemoveDisabled ? 'hidden' : 'flex'}`}
                    onClick={() => onRemove(index)}
                    disabled={isRemoveDisabled}
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </Button>
            </div>

            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    {/* Product Selection */}
                    <div className="col-span-1 md:col-span-5 lg:col-span-4 space-y-2">
                        <GenericCombobox
                            required
                            label="Product Name"
                            items={products.map(p => ({ id: p.id, name: p.name }))}
                            selectedId={item.product_id}
                            onSelect={(id) => onItemChange(index, "product_id", id)}
                            placeholder="Select a product..."
                            searchPlaceholder="Search product..."
                            error={productIdError}
                            renderAction={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal('CREATE_PRODUCT', {
                                            units: units,
                                            onSuccess: (newProduct: Product) => {
                                                if (onProductCreated) onProductCreated(newProduct);
                                                onItemChange(index, "product_id", newProduct.id, newProduct);
                                            }
                                        });
                                    }}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-2">
                        <FormLabel required>QTY</FormLabel>
                        <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onItemChange(index, "quantity", e.target.value)}
                            className={`text-center font-bold h-10 transition-colors ${
                                quantityError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                    : 'border-slate-200 focus-visible:ring-primary/20'
                            }`}
                        />
                        <ErrorMessage message={quantityError} />
                    </div>

                    {/* Unit Price Input */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-3 space-y-2">
                        <FormLabel required>Unit Price</FormLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                value={item.unit_price}
                                onChange={(e) => onItemChange(index, "unit_price", e.target.value)}
                                className={`font-bold h-10 text-sm transition-colors ${
                                    unitPriceError
                                        ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                        : 'border-slate-200 focus-visible:ring-primary/20'
                                }`}
                            />
                        </div>
                        <ErrorMessage message={unitPriceError} />
                    </div>

                    {/* Costing Price Input */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-3 space-y-2">
                        <FormLabel>Costing (Flat)</FormLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                value={item.costing_price}
                                onChange={(e) => onItemChange(index, "costing_price", e.target.value)}
                                className={`font-bold h-10 text-sm transition-colors ${
                                    costingPriceError
                                        ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                        : 'border-slate-200 focus-visible:ring-primary/20'
                                }`}
                            />
                        </div>
                        <ErrorMessage message={costingPriceError} />
                    </div>


                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
                    {/* Description/Specifications */}
                    <div className="lg:col-span-9 space-y-2">
                        <FormLabel>Specifications / Description</FormLabel>
                        <Textarea
                            value={item.description || ""}
                            onChange={(e) => onItemChange(index, "description", e.target.value)}
                            placeholder="Add detailed product specifications here..."
                            className={`text-sm min-h-20 leading-relaxed resize-none transition-colors ${
                                descriptionError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                    : 'border-slate-200 focus-visible:ring-primary/20'
                            }`}
                        />
                        <ErrorMessage message={descriptionError} />
                    </div>

                    {/* Total Calculation Display - Desktop (shown on lg+) */}
                    <div className="flex lg:col-span-3 flex-col justify-end h-full">
                        <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 border border-slate-100 shadow-inner">
                            <div className="flex justify-between items-center px-1 border-b border-slate-200/60 pb-1.5">
                                <span className="text-[10px] uppercase font-semibold text-slate-500">Gross Unit:</span>
                                <span className="text-xs font-mono font-bold text-slate-700">
                                    ৳{calculateGross().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-1 pt-0.5">
                                <span className="text-[11px] uppercase font-black text-primary">Line Total:</span>
                                <span className="text-sm font-mono font-black text-primary">
                                    ৳{calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                </div>
            </div>
        </div>
    );
};
