import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Info, LayoutList } from "lucide-react";
import { Requirement, RequirementItem } from "@/types/requirement";
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";

interface Props {
    requirement: Requirement;
    customers: Customer[];
    products: Product[];
}

export default function RequirementForm({ requirement, customers, products }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: requirement?.customer_id || "",
        notes: requirement?.notes || "",
        status: requirement?.status || "pending",
        items: requirement?.items || [
            { product_id: 0, quantity: 1, unit_price: "" }
        ],
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: 0, quantity: 1, unit_price: "" }]);
    };

    const removeItem = (index: number) => {
        setData("items", data.items.filter((_: any, i: number) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementItem, value: any) => {
        const newItems = [...data.items] as RequirementItem[];
         if (field === "product_id") {
            const product = products.find(p => p.id === parseInt(value));
            newItems[index].product_id = parseInt(value);
            newItems[index].unit_price = product ? product.unit_price : "";
        } else {
            (newItems[index] as any)[field] = value;
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
        <form onSubmit={submit} className="max-w-5xl mx-auto space-y-8 pb-10">
            {/* Top Section: Customer & Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card p-6 border rounded-xl shadow-sm">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                        <Info className="w-4 h-4" /> Customer Information
                    </label>
                    <Select
                        value={data.customer_id.toString()}
                        onValueChange={(value) => setData("customer_id", parseInt(value))}
                    >
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select Customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map((c: any) => (
                                <SelectItem key={c.id} value={c.id.toString()}>{c.full_name_with_company || `${c.name} - ${c.company_name}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.customer_id && <p className="text-destructive text-xs italic">{errors.customer_id}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Status</label>
                    <Select value={data.status} onValueChange={(v) => setData("status", v)}>
                        <SelectTrigger className="h-11">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="purchased">Purchased</SelectItem>
                            <SelectItem value="cancel">Cancel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Items Table Section */}
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/40 flex justify-between items-center border-b">
                    <h3 className="font-bold flex items-center gap-2 uppercase text-sm tracking-widest">
                        <LayoutList className="w-4 h-4 text-primary" /> Requirement Items
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 gap-1">
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>

                <div className="p-4 space-y-3">
                    {/* Header Row for Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-2 text-[10px] font-black uppercase text-muted-foreground mb-1">
                        <div className="col-span-5">Product Name</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-2">Unit Price</div>
                        <div className="col-span-2 text-right">Subtotal</div>
                        <div className="col-span-1"></div>
                    </div>

                    {data.items.map((item: any, index: number) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center bg-muted/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none border md:border-0 relative">
                            <div className="col-span-1 md:col-span-5">
                                <Select
                                    value={item.product_id?.toString()}
                                    onValueChange={(val) => handleItemChange(index, "product_id", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((p) => (
                                            <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <Input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground text-xs">৳</span>
                                    <Input
                                        type="number"
                                        className="pl-6"
                                        placeholder="Price"
                                        value={item.unit_price}
                                        onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 text-right pr-2">
                                <span className="text-xs md:hidden text-muted-foreground block">Subtotal: </span>
                                <span className="font-mono font-bold">
                                    {((parseFloat(item.unit_price) || 0) * (item.quantity || 0)).toLocaleString()}
                                </span>
                            </div>

                            <div className="absolute top-2 right-2 md:relative md:top-0 md:right-0 md:col-span-1 text-right">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
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
                <div className="bg-muted/40 p-6 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="w-full md:max-w-md">
                        <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Notes / Special Instructions</label>
                        <Textarea
                            className="bg-background resize-none"
                            rows={2}
                            placeholder="Type internal notes here..."
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                        />
                    </div>
                    <div className="text-right w-full md:w-auto">
                        <p className="text-xs font-bold uppercase text-muted-foreground">Amount Payable</p>
                        <p className="text-3xl font-black text-primary">
                            <span className="text-lg mr-1 font-normal">BDT</span>
                            {grandTotal.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" size="lg" className="px-12 font-bold" disabled={processing}>
                    {requirement ? "Update Requirement" : "Save Requirement"}
                </Button>
            </div>
        </form>
    );
}
