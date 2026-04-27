import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "@/components/admin/ErrorMessage";

interface Props {
    company?: any;
}

const FormLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {children}
    </label>
);

export default function CompanyForm({ company }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: company?.name ?? "",
        email: company?.email ?? "",
        phone: company?.phone ?? "",
        website: company?.website ?? "",
        address: company?.address ?? "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = company ? route("companies.update", company.id) : route("companies.store");
        company ? put(routeName) : post(routeName);
    };

    return (
        <form onSubmit={submit} className="space-y-8 max-w-2xl">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <FormLabel>Company Name</FormLabel>
                    <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="e.g. Acme Corp" />
                    <ErrorMessage message={errors.name} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="info@acme.com" />
                        <ErrorMessage message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <FormLabel>Phone Number</FormLabel>
                        <Input value={data.phone} onChange={e => setData("phone", e.target.value)} placeholder="+880..." />
                        <ErrorMessage message={errors.phone} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <FormLabel>Website</FormLabel>
                    <Input value={data.website} onChange={e => setData("website", e.target.value)} placeholder="https://..." />
                    <ErrorMessage message={errors.website} />
                </div>

                <div className="grid gap-2">
                    <FormLabel>Address</FormLabel>
                    <Textarea value={data.address} onChange={e => setData("address", e.target.value)} placeholder="Full address details..." className="min-h-32" />
                    <ErrorMessage message={errors.address} />
                </div>
            </div>

            <footer className="flex items-center justify-end gap-4 pt-8 border-t">
                <Button variant="outline" type="button" onClick={() => window.history.back()} disabled={processing}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing} className="min-w-35">
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        company ? "Update Company" : "Create Company"
                    )}
                </Button>
            </footer>
        </form>
    );
}
