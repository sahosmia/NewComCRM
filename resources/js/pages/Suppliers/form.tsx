import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import FormLabel from "@/components/admin/form/FormLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Supplier } from "@/types";

interface Props {
    supplier?: Supplier;
}

export default function SupplierForm({ supplier }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: supplier?.name || "",
        email: supplier?.email || "",
        phone: supplier?.phone || "",
        address: supplier?.address || "",
        description: supplier?.description || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (supplier) {
            put(route("suppliers.update", supplier.id));
        } else {
            post(route("suppliers.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <FormLabel required>Supplier Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="Supplier Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    <ErrorMessage message={errors.name} />
                </div>

                <div className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="supplier@example.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <ErrorMessage message={errors.email} />
                </div>

                <div className="space-y-2">
                    <FormLabel>Phone</FormLabel>
                    <Input
                        id="phone"
                        placeholder="Phone Number"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    <ErrorMessage message={errors.phone} />
                </div>
            </div>

            <div className="space-y-2">
                <FormLabel>Address</FormLabel>
                <Textarea
                    id="address"
                    placeholder="Supplier Address"
                    value={data.address}
                    rows={3}
                    onChange={(e) => setData("address", e.target.value)}
                />
                <ErrorMessage message={errors.address} />
            </div>

            <div className="space-y-2">
                <FormLabel>Description</FormLabel>
                <Textarea
                    id="description"
                    placeholder="Additional details..."
                    value={data.description}
                    rows={4}
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
                        supplier ? "Update Supplier" : "Create Supplier"
                    )}
                </Button>
            </div>
        </form>
    );
}
