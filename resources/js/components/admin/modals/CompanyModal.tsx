import * as React from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormLabel from "@/components/admin/form/FormLabel";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Company } from "@/types";
import { toast } from "sonner";

interface CompanyModalProps {
    onSuccess: (company: Company) => void;
    trigger?: React.ReactNode;
}

export function CompanyModal({ onSuccess, trigger }: CompanyModalProps) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [data, setData] = React.useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        address: "",
    });

    const resetForm = () => {
        setData({
            name: "",
            email: "",
            phone: "",
            website: "",
            address: "",
        });
        setErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // @ts-ignore
            const url = route("companies.store");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // @ts-ignore
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content || "",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Company created successfully");
                onSuccess(result.company);
                setOpen(false);
                resetForm();
            } else if (response.status === 422) {
                const validationErrors = result.errors;
                const formattedErrors: Record<string, string> = {};
                Object.keys(validationErrors).forEach((key) => {
                    formattedErrors[key] = validationErrors[key][0];
                });
                setErrors(formattedErrors);
            } else {
                toast.error(result.message || "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) resetForm();
        }}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" type="button">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Company
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Company</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new company here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <FormLabel>Company Name</FormLabel>
                            <Input
                                value={data.name}
                                onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g. Acme Corp"
                            />
                            <ErrorMessage message={errors.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="info@acme.com"
                                />
                                <ErrorMessage message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    value={data.phone}
                                    onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="+880..."
                                />
                                <ErrorMessage message={errors.phone} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <FormLabel>Website</FormLabel>
                            <Input
                                value={data.website}
                                onChange={e => setData(prev => ({ ...prev, website: e.target.value }))}
                                placeholder="https://..."
                            />
                            <ErrorMessage message={errors.website} />
                        </div>
                        <div className="grid gap-2">
                            <FormLabel>Address</FormLabel>
                            <Textarea
                                value={data.address}
                                onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                                placeholder="Full address details..."
                            />
                            <ErrorMessage message={errors.address} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : "Save Company"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
