import { Trash2, ShoppingCart, DollarSign, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Product } from "@/types";
import { Label } from "@/components/ui/label";
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
    const calculateTotal = () => (parseFloat(item.unit_price) || 0) * (item.quantity || 0) * aitFactor;

    return (
        <div className="group relative bg-card border rounded-xl p-4 md:p-5 transition-all hover:border-primary/30 hover:shadow-md mb-4">
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

                    <GenericCombobox
                        label="Product Name"
                        items={products.map(p => ({ id: p.id, name: p.name }))}
                        selectedId={item.product_id}
                        onSelect={(id) => onItemChange(index, "product_id", id)}
                        placeholder="Select a product..."
                        searchPlaceholder="Search product..."
                    />
                    <ErrorMessage message={errors[`items.${index}.product_id`]} />
                </div>

                {/* Description/Specifications */}
                <div className="col-span-1 md:col-span-3 space-y-2">
                    <FormLabel>Description</FormLabel>

                    <Textarea
                        value={item.description || ""}
                        placeholder="Automatic specs..."
                        readOnly
                        className="text-[11px] min-h-10.5 h-auto leading-snug resize-none bg-muted/20 border-dashed border-slate-200 cursor-not-allowed italic text-muted-foreground"
                    />
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-1 space-y-2 ">
                    <FormLabel>QTY</FormLabel>
                    <Input
                        type="number"
                        min="1"
                        className="text-center font-bold h-10 border-slate-200"
                        value={item.quantity}
                        onChange={(e) => onItemChange(index, "quantity", parseInt(e.target.value, 10) || 0)}

                    />
                    <ErrorMessage message={errors[`items.${index}.quantity`]} />
                </div>

                {/* Unit Price Input */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <FormLabel>Unit Price</FormLabel>

                    <div className="relative group/price">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground group-focus-within/price:text-primary transition-colors">৳</span>
                        <Input
                            type="number"
                            className="pl-7 font-bold h-10 border-slate-200 focus:ring-2 focus:ring-primary/20"
                            value={item.unit_price}
                            onChange={(e) => onItemChange(index, "unit_price", e.target.value)}
                        />
                    </div>
                    <ErrorMessage message={errors[`items.${index}.unit_price`]} />
                </div>

                {/* Total Calculation Display */}
                <div className="col-span-1 md:col-span-2 bg-primary/5 rounded-lg p-2 space-y-1 border border-primary/10 self-end">
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
