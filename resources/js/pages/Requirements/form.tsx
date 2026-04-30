import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, LayoutList, Info } from "lucide-react";
import { Requirement, RequirementItem } from "@/types/requirement";
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { FormSelect } from "@/components/admin/form/FormSelect";
import { RequirementOptions } from "./Columns";

interface Props {
    requirement: Requirement;
    customers: Customer[];
    products: Product[];
}

export default function RequirementForm({ requirement, customers, products }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');

    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: requirement?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        notes: requirement?.notes || "",
        status: requirement?.status || "pending",
        items: requirement?.items || [
            { product_id: 0, quantity: 1, unit_price: "", description: "" }
        ],
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: 0, quantity: 1, unit_price: "", description: "" }]);
    };

    const removeItem = (index: number) => {
        setData("items", data.items.filter((_: any, i: number) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementItem | 'description', value: any) => {
        const newItems = [...data.items] as any[];

        if (field === "product_id") {
            const product = products.find(p => p.id === parseInt(value));
            newItems[index].product_id = parseInt(value);
            newItems[index].unit_price = product ? product.unit_price : "";
            newItems[index].description = product ? product.description : ""; 
        } else {
            newItems[index][field] = value;
        }
        setData("items", newItems);
    };

    const grandTotal = data.items.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.unit_price) || 0) * (item.quantity || 0);
    }, 0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        requirement ? put(route("requirements.update", requirement.id)) : post(route("requirements.store"));
    };

    return (
        <form onSubmit={submit} className="max-w-6xl mx-auto space-y-8 pb-10">
            {/* Top Section: Customer & Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-card p-6 border rounded-xl shadow-sm">
                <div className="md:col-span-3 space-y-1">
                    <GenericCombobox
                        label="Customer Information"
                        items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || `${c.name} - ${c.company?.name || ''}` }))}
                        selectedId={data.customer_id}
                        onSelect={(id) => setData("customer_id", id as number)}
                        placeholder="Select Customer"
                        searchPlaceholder="Search customers..."
                    />
                    <ErrorMessage message={errors.customer_id} />
                </div>

                <div className="space-y-1">
                    <FormSelect
                        label="Status"
                        value={data.status}
                        onChange={(v) => setData("status", v as Requirement["status"])}
                        options={RequirementOptions}
                        error={errors.status}
                    />
                </div>
            </div>

            {/* Items Section */}
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/40 flex justify-between items-center border-b">
                    <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest text-muted-foreground">
                        <LayoutList className="w-4 h-4 text-primary" /> Requirement Items
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 gap-1 bg-background">
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>

                <div className="p-4 space-y-4">
                    {/* Table Header for Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-2 text-[10px] font-black uppercase text-muted-foreground">
                        <div className="col-span-4">Product Selection</div>
                        <div className="col-span-4">Technical Description</div>
                        <div className="col-span-1 text-center">Qty</div>
                        <div className="col-span-2">Unit Price</div>
                        <div className="col-span-1"></div>
                    </div>

                    {data.items.map((item: any, index: number) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start bg-muted/10 md:bg-transparent p-4 md:p-0 rounded-lg border md:border-0 relative group">

                            {/* Product Selection */}
                            <div className="col-span-1 md:col-span-4">
                                <GenericCombobox
                                    label=""
                                    items={products.map(p => ({ id: p.id, name: p.name }))}
                                    selectedId={item.product_id}
                                    onSelect={(id) => handleItemChange(index, "product_id", id)}
                                    placeholder="Select Product"
                                />
                            </div>

                            {/* READ-ONLY Description Field */}
                            <div className="col-span-1 md:col-span-4">
                                <div className="relative group/desc">
                                    <Textarea
                                        value={item.description || ""}
                                        placeholder="Product specs will appear automatically..."
                                        readOnly
                                        tabIndex={-1}
                                        className="text-[11px] leading-relaxed min-h-[40px] md:min-h-[38px] py-2 px-3 resize-none bg-muted/40 border-dashed border-slate-200 cursor-not-allowed focus-visible:ring-0 text-muted-foreground italic"
                                    />
                                    {!item.description && item.product_id !== 0 && (
                                        <span className="absolute right-2 top-2 text-slate-300">
                                            <Info className="w-3 h-3" />
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="col-span-1 md:col-span-1">
                                <Input
                                    type="number"
                                    min="1"
                                    className="md:text-center font-medium"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                                />
                            </div>

                            {/* Price & Subtotal Combined for UX */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="space-y-1.5">
                                    <div className="relative">
                                        <span className="absolute left-2.5 top-2.5 text-[10px] font-bold text-muted-foreground">৳</span>
                                        <Input
                                            type="number"
                                            className="pl-6 font-semibold border-slate-300 focus:border-primary"
                                            value={item.unit_price}
                                            onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[9px] uppercase font-bold text-muted-foreground">Line Total:</span>
                                        <span className="text-xs font-mono font-bold text-primary">
                                            {((parseFloat(item.unit_price) || 0) * (item.quantity || 0)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Remove Action */}
                            <div className="absolute -top-2 -right-2 md:relative md:top-0 md:right-0 md:col-span-1 text-right pt-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-full"
                                    onClick={() => removeItem(index)}
                                    disabled={data.items.length === 1}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grand Total Footer */}
                <div className="bg-muted/40 p-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className="w-full md:max-w-sm space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Internal Remarks</label>
                        <Textarea
                            className="bg-background resize-none text-xs border-slate-200 focus:border-primary/50"
                            rows={2}
                            placeholder="Add special instructions for team..."
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                        />
                    </div>

                    <div className="text-right space-y-0.5">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Est. Grand Total</p>
                        <div className="flex items-baseline justify-end gap-2 text-primary">
                            <span className="text-sm font-medium">BDT</span>
                            <span className="text-4xl font-black tabular-nums tracking-tighter">
                                {grandTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-4 border-t pt-6 border-slate-100">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => window.history.back()}
                    className="text-muted-foreground hover:text-foreground"
                >
                    Discard Changes
                </Button>
                <Button
                    type="submit"
                    size="lg"
                    className="px-16 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={processing}
                >
                    {requirement ? "Update Record" : "Confirm & Save"}
                </Button>
            </div>
        </form>
    );
}
