import { Plus, Trash2 } from "lucide-react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import FormLabel from "@/components/admin/form/FormLabel";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/contexts/ModalContext";
import type { Product, Unit } from "@/types";

interface ItemRowProps {
    index: number;
    item: any;
    products: Product[];
    aitFactor: number;
    onItemChange: (index: number, field: any, value: any, product?: Product) => void;
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
    const sourceError = errors && errors[`items.${index}.source`];

    return (
        <div className={`group relative bg-card border rounded-xl p-4 md:p-6 transition-all hover:shadow-lg mb-6 ${errors && Object.keys(errors).some(key => key.startsWith(`items.${index}.`))
            ? 'border-destructive/40 bg-destructive/5 shadow-sm shadow-destructive/5'
            : 'border-border hover:border-primary/40'
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
                    <div className="col-span-1 md:col-span-4 lg:col-span-3 space-y-2">
                        <GenericCombobox
                            required
                            label="Product Name"
                            items={products}
                            selectedId={item.product_id}
                            onSelect={(id, name, product) => onItemChange(index, "product_id", id, product)}
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
                    <div className="col-span-1 space-y-2">
                        <FormLabel required>QTY</FormLabel>
                        <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onItemChange(index, "quantity", e.target.value)}
                            className={`text-center font-bold h-10 transition-colors ${quantityError
                                ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/5'
                                : 'border-border focus-visible:ring-primary/20'
                                }`}
                        />
                        <ErrorMessage message={quantityError} />
                    </div>
                    {/* Unit */}
                    <div className="col-span-1 space-y-2">
                        <FormLabel >Unit</FormLabel>
                        <Input
                            type="text"
                            readOnly
                            value={item.unit_short_form || ""}
                            className="text-center font-bold h-10 transition-colors border-border/50 bg-muted cursor-not-allowed"
                        />
                    </div>
                    {/* Costing Price Input */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-2">
                        <FormLabel>Costing Price</FormLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                value={item.costing_price}
                                onChange={(e) => onItemChange(index, "costing_price", e.target.value)}
                                className={`font-bold h-10 text-sm transition-colors ${costingPriceError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/5'
                                    : 'border-border focus-visible:ring-primary/20'
                                    }`}
                            />
                        </div>
                        <ErrorMessage message={costingPriceError} />
                    </div>

                    {/* Sale Price Input */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-2">
                        <FormLabel>Sell Price</FormLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                value={item.unit_price}
                                onChange={(e) => onItemChange(index, "unit_price", e.target.value)}
                                className={`font-bold h-10 text-sm transition-colors ${unitPriceError
                                    ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/5'
                                    : 'border-border focus-visible:ring-primary/20'
                                    }`}
                            />
                        </div>
                        <ErrorMessage message={unitPriceError} />
                    </div>


                    {/* Total Calculation Display - Desktop (shown on lg+) */}
                    <div className="flex lg:col-span-3 flex-col justify-end h-full">
                        <div className="bg-muted/50 rounded-xl p-3 space-y-1.5 border border-border shadow-inner">
                            {/* <div className="flex justify-between items-center px-1 border-b border-border/60 pb-1.5">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Costing Price:</span>
                                <span className="text-xs font-mono font-bold text-foreground">
                                    ৳{(item.costing_price*item.quantity).toFixed(2)}
                                </span>
                            </div> */}
                            <div className="flex justify-between items-center px-1 border-b border-border/60 pb-1.5">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Gross Unit:</span>
                                <span className="text-xs font-mono font-bold text-foreground">
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
                    {/* Description/Specifications */}
                    <div className="lg:col-span-5 space-y-2">
                        <FormLabel>Specifications / Description</FormLabel>
                        <Textarea
                            value={item.description || ""}
                            onChange={(e) => onItemChange(index, "description", e.target.value)}
                            placeholder="Add detailed product specifications here..."
                            className={`text-sm min-h-20 max-h-36 leading-relaxed resize-none transition-colors ${descriptionError
                                ? 'border-destructive focus-visible:ring-destructive/20 bg-destructive/5'
                                : 'border-border focus-visible:ring-primary/20'
                                }`}
                        />
                        <ErrorMessage message={descriptionError} />
                    </div>
                    <div className="col-span-4 space-y-2">
                        <FormLabel>Source</FormLabel>
                        <Textarea
                            readOnly
                            value={item.source || ""}
                            className={`text-sm min-h-20 max-h-28 overflow-y-auto leading-relaxed resize-none transition-colors border-border bg-muted cursor-not-allowed`} />
                    </div>

                    <div className="col-span-3 space-y-2">
                        <FormLabel>Supplier</FormLabel>
                        <Input
                            type="text"
                            readOnly
                            value={item.supplier || ""}
                            className="font-bold h-10 transition-colors border-border bg-muted cursor-not-allowed"
                        />
                    </div>


                </div>
            </div>
        </div>
    );
};
