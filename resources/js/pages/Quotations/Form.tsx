import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Quotation, QuotationItem } from "@/types/quotation";
import { Product } from "@/types/product";
import { Plus, Trash } from "lucide-react";

interface Props {
    quotation?: Quotation;
    customers: { id: number; name: string }[];
    products: Product[];
}

export default function QuotationForm({ quotation, customers, products }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: quotation?.customer_id || "",
        valid_until: quotation?.valid_until ? new Date(quotation.valid_until).toISOString().slice(0, 10) : "",
        items: quotation?.items || [{ product_id: "", quantity: 1, unit_price: "0", description: "" }],
        tax: quotation?.tax || "0",
        discount: quotation?.discount || "0",
        terms_conditions: quotation?.terms_conditions || "",
        notes: quotation?.notes || "",
        status: quotation?.status || "draft",
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: "", quantity: 1, unit_price: "0", description: "" }]);
    };

    const removeItem = (index: number) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...data.items] as any[];
        newItems[index][field] = value;

        if (field === 'product_id') {
            const product = products.find(p => p.id === parseInt(value));
            if (product) {
                newItems[index]['unit_price'] = product.unit_price;
                newItems[index]['description'] = product.name;
            }
        }

        setData("items", newItems);
    };

    const calculateSubtotal = () => {
        return data.items.reduce((sum, item: any) => sum + (parseFloat(item.unit_price) * item.quantity), 0);
    };

    const subtotal = calculateSubtotal();
    const total = subtotal + parseFloat(data.tax as string) - parseFloat(data.discount as string);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (quotation) {
            put(route("quotations.update", quotation.id));
        } else {
            post(route("quotations.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Customer</label>
                    <Select
                        value={data.customer_id.toString()}
                        onValueChange={(value) => setData("customer_id", parseInt(value))}
                        disabled={!!quotation}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id.toString()}>
                                    {customer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.customer_id && <div className="text-red-500 text-sm">{errors.customer_id}</div>}
                </div>
                <div>
                    <label className="text-sm font-medium">Valid Until</label>
                    <Input
                        type="date"
                        value={data.valid_until}
                        onChange={(e) => setData("valid_until", e.target.value)}
                    />
                    {errors.valid_until && <div className="text-red-500 text-sm">{errors.valid_until}</div>}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Items</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-1" /> Add Item
                    </Button>
                </div>
                {errors.items && <div className="text-red-500 text-sm">{errors.items}</div>}

                {data.items.map((item: any, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end border p-2 rounded">
                        <div className="col-span-4">
                            <label className="text-xs">Product</label>
                            <Select
                                value={item.product_id.toString()}
                                onValueChange={(value) => updateItem(index, 'product_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map((product) => (
                                        <SelectItem key={product.id} value={product.id.toString()}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs">Qty</label>
                            <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs">Price</label>
                            <Input
                                type="number"
                                step="0.01"
                                value={item.unit_price}
                                onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="text-xs">Total</label>
                            <div className="h-9 flex items-center px-3 border rounded bg-muted text-sm">
                                ${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm">Tax:</label>
                        <Input
                            type="number"
                            className="w-24 h-8"
                            value={data.tax}
                            onChange={(e) => setData("tax", e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm">Discount:</label>
                        <Input
                            type="number"
                            className="w-24 h-8"
                            value={data.discount}
                            onChange={(e) => setData("discount", e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Terms & Conditions</label>
                    <Textarea
                        value={data.terms_conditions}
                        onChange={(e) => setData("terms_conditions", e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                    value={data.status}
                    onValueChange={(value: any) => setData("status", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" disabled={processing}>
                {quotation ? "Update Quotation" : "Create Quotation"}
            </Button>
        </form>
    );
}
