import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Product } from "@/types";
import FormLabel from "@/components/admin/form/FormLabel";

interface ItemRowProps {
    index: number;
    item: any;
    products: Product[];
    aitFactor: number;
    onItemChange: (index: number, field: any, value: any) => void;
    onRemove: (index: number) => void;
    isRemoveDisabled: boolean;
    errors: any;
}

export const RequirementItemRow = ({ index, item, products, aitFactor, onItemChange, onRemove, isRemoveDisabled, errors }: ItemRowProps) => {

    const calculateGross = () => (parseFloat(item.unit_price) || 0) * aitFactor;
    const calculateTotal = () => ((parseFloat(item.unit_price) || 0) * (item.quantity || 0) * aitFactor) + (parseFloat(item.costing_price) || 0);

    // Helpers to extract error presence for field-specific conditional classes
    const productIdError = errors && errors[`items.${index}.product_id`];
    const descriptionError = errors && errors[`items.${index}.description`];
    const quantityError = errors && errors[`items.${index}.quantity`];
    const unitPriceError = errors && errors[`items.${index}.unit_price`];
    const costingPriceError = errors && errors[`items.${index}.costing_price`];

    return (
        <div className={`group relative bg-card border rounded-xl p-4 md:p-5 transition-all hover:shadow-md mb-4 ${
            errors && Object.keys(errors).some(key => key.startsWith(`items.${index}.`))
                ? 'border-destructive/40 bg-destructive/[0.01]'
                : 'hover:border-primary/30'
        }`}>

            {/* Remove Row Button */}
            <div className="absolute -top-3 -right-3 z-10">
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className={`h-8 w-8 rounded-full shadow-lg transition-transform hover:scale-110 ${isRemoveDisabled ? 'hidden' : 'flex'}`}
                    onClick={() => onRemove(index)}
                    disabled={isRemoveDisabled}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">

                {/* Product Selection */}
                <div className="col-span-1 md:col-span-4 space-y-2">
                    <div className={productIdError ? "[&>button]:border-destructive [&>button]:focus:ring-destructive/20" : ""}>
                        <GenericCombobox
                            label="Product Name"
                            items={products.map(p => ({ id: p.id, name: p.name }))}
                            selectedId={item.product_id}
                            onSelect={(id) => onItemChange(index, "product_id", id)}
                            placeholder="Select a product..."
                            searchPlaceholder="Search product..."
                        />
                    </div>
                    <ErrorMessage message={productIdError} />
                </div>

                {/* Description/Specifications */}
                <div className="col-span-1 md:col-span-3 space-y-2">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={item.description || ""}
                        onChange={(e) => onItemChange(index, "description", e.target.value)}
                        placeholder="Product Description..."
                        className={`text-[11px] min-h-10.5 h-auto leading-snug resize-none border-dashed italic text-muted-foreground transition-colors ${
                            descriptionError
                                ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                : 'border-slate-200 focus-visible:ring-primary/20'
                        }`}
                    />
                    <ErrorMessage message={descriptionError} />
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-1 space-y-2">
                    <FormLabel>QTY</FormLabel>
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
                <div className="col-span-1 md:col-span-1 space-y-2">
                    <FormLabel>Unit Price</FormLabel>
                    <div className="relative group/price">
                        <Input
                            type="number"
                            value={item.unit_price}
                            onChange={(e) => onItemChange(index, "unit_price", e.target.value)}
                            className={`pl-2 font-bold h-10 text-xs transition-colors ${
                                unitPriceError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                    : 'border-slate-200 focus-visible:ring-primary/20'
                            }`}
                        />
                    </div>
                    <ErrorMessage message={unitPriceError} />
                </div>

                {/* Costing Price Input */}
                <div className="col-span-1 md:col-span-1 space-y-2">
                    <FormLabel>Costing</FormLabel>
                    <div className="relative group/cost">
                        <Input
                            type="number"
                            value={item.costing_price}
                            onChange={(e) => onItemChange(index, "costing_price", e.target.value)}
                            className={`pl-2 font-bold h-10 text-xs transition-colors ${
                                costingPriceError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/[0.02]'
                                    : 'border-slate-200 focus-visible:ring-primary/20'
                            }`}
                        />
                    </div>
                    <ErrorMessage message={costingPriceError} />
                </div>

                {/* Total Calculation Display */}
                <div className="col-span-1 md:col-span-2 bg-primary/5 rounded-lg p-2 space-y-1 border border-primary/10 self-end md:mb-[28px]">
                    <div className="flex justify-between items-center px-1 border-b border-primary/10 pb-1">
                        <span className="text-[9px] uppercase font-bold text-muted-foreground">Gross Unit:</span>
                        <span className="text-[10px] font-mono font-bold text-slate-700">
                            {calculateGross().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center px-1 pt-0.5">
                        <span className="text-[10px] uppercase font-black text-primary">Line Total:</span>
                        <span className="text-sm font-mono font-black text-primary">
                            ৳{calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
