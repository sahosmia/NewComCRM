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
import { Requirement } from "@/types/requirement";
import { Product } from "@/types/product";

interface Props {
    requirement?: Requirement;
    customers: { id: number; name: string; company_name: string }[];
    products: { id: number; name: string; unit_price: string }[];
}

export default function RequirementForm({ requirement, customers, products }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: requirement?.customer_id || "",
        product_id: requirement?.product_id || "",
        quantity: requirement?.quantity || 1,
        unit_price: requirement?.unit_price || "",
        notes: requirement?.notes || "",
    });

    const handleProductChange = (productId: string) => {
        const product = products.find(p => p.id === parseInt(productId));
        setData(prevData => ({
            ...prevData,
            product_id: parseInt(productId),
            unit_price: product ? product.unit_price : prevData.unit_price
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (requirement) {
            put(route("requirements.update", requirement.id));
        } else {
            post(route("requirements.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Customer</label>
                <Select
                    value={data.customer_id.toString()}
                    onValueChange={(value) => setData("customer_id", parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                                {customer.name} ({customer.company_name})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.customer_id && <div className="text-red-500 text-sm">{errors.customer_id}</div>}
            </div>

            <div>
                <label className="text-sm font-medium">Product</label>
                <Select
                    value={data.product_id.toString()}
                    onValueChange={handleProductChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                                {product.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.product_id && <div className="text-red-500 text-sm">{errors.product_id}</div>}
            </div>

            <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                    type="number"
                    value={data.quantity}
                    onChange={(e) => setData("quantity", parseInt(e.target.value) || 0)}
                />
                {errors.quantity && <div className="text-red-500 text-sm">{errors.quantity}</div>}
            </div>

            <div>
                <label className="text-sm font-medium">Unit Price</label>
                <Input
                    type="number"
                    step="0.01"
                    value={data.unit_price}
                    onChange={(e) => setData("unit_price", e.target.value)}
                />
                {errors.unit_price && <div className="text-red-500 text-sm">{errors.unit_price}</div>}
            </div>

            <div className="pt-2 border-t">
                <p className="text-sm font-bold">
                    Estimated Total: ${(parseFloat(data.unit_price as string) || 0) * (data.quantity || 0)}
                </p>
            </div>

            <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                />
                {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
            </div>

            <Button type="submit" disabled={processing}>
                {requirement ? "Update" : "Create"}
            </Button>
        </form>
    );
}
