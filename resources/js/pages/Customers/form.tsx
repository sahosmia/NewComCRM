import { useForm } from "@inertiajs/react";
import { Check, ChevronsUpDown, Loader2, Plus, X } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CustomerType, User } from "@/types";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import FormLabel from "@/components/admin/form/FormLabel";
import ErrorMessage from "@/components/admin/form/ErrorMessage";

interface Company {
    id: number;
    name: string;
}

interface Props {
    customer?: CustomerType;
    users: User[];
    companies: Company[];
}



export default function CustomerForm({ customer, users, companies }: Props) {
    const [openPopover, setOpenPopover] = useState(false);
    const [openCompanyPopover, setOpenCompanyPopover] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        name: customer?.name ?? "",
        designation: customer?.designation ?? "",
        company_id: customer?.company_id ?? "",
        email: customer?.email ?? "",
        assigned_to: customer?.assigned_to ?? "",
        status: customer?.status ?? "active",
        type: customer?.type ?? "corporate",
        phones: customer?.phones?.length ? customer.phones : [""],
        addresses: customer?.addresses?.length ? customer.addresses : [""],
        remarks: customer?.remarks ?? "",
    });

    const updateListItem = useCallback((key: "phones" | "addresses", index: number, value: string) => {
        const newList = [...data[key]];
        newList[index] = value;
        setData(key, newList);
    }, [data, setData]);

    const addListItem = (key: "phones" | "addresses") => setData(key, [...data[key], ""]);

    const removeListItem = (key: "phones" | "addresses", index: number) => {
        if (data[key].length > 1) {
            setData(key, data[key].filter((_, i) => i !== index));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = customer ? route("customers.update", customer.id) : route("customers.store");
        customer ? put(routeName) : post(routeName);
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Section 1: Identity & Contact */}
                <div className="space-y-6">
                    <header>
                        <h3 className="text-lg font-semibold text-primary">Identity & Contact</h3>
                        <p className="text-sm text-muted-foreground">Primary details and contact information.</p>
                        <div className="h-px bg-border mt-2" />
                    </header>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <FormLabel>Full Name</FormLabel>
                            <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="e.g. John Doe" />
                            <ErrorMessage message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="john@example.com" />
                            <ErrorMessage message={errors.email} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <GenericCombobox
                                    label="Company"
                                    items={companies}
                                    selectedId={data.company_id}
                                    placeholder="Select company"
                                    searchPlaceholder="Search company..."
                                    onSelect={(id) => setData("company_id", id)}
                                />

                                <ErrorMessage message={errors.company_id} />
                            </div>
                            <div className="grid gap-2">
                                <FormLabel>Designation</FormLabel>
                                <Input value={data.designation} onChange={e => setData("designation", e.target.value)} placeholder="Manager" />
                            </div>
                        </div>

                        {/* Phone Numbers - Dynamic List */}
                        <div className="space-y-3">
                            <FormLabel>Phone Numbers</FormLabel>
                            {data.phones.map((phone, i) => (
                                <div key={`phone-${i}`} className="space-y-1">
                                    <div className="flex gap-2 relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground border-r pr-2 flex items-center h-4 z-10 pointer-events-none">+88</div>
                                        <Input
                                            value={phone}
                                            onChange={e => updateListItem("phones", i, e.target.value.replace(/\D/g, '').slice(0, 11))}
                                            placeholder="017XXXXXXXX"
                                            className={cn("pl-14", errors[`phones.${i}` as keyof typeof errors] && "border-destructive")}
                                        />
                                        {data.phones.length > 1 && (
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("phones", i)} className="h-9 w-9 text-muted-foreground hover:text-destructive">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <ErrorMessage message={errors[`phones.${i}` as keyof typeof errors] as string} />
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => addListItem("phones")} className="w-full border-dashed">
                                <Plus className="w-4 h-4 mr-2" /> Add Phone Number
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Section 2: Localization & Assignment */}
                <div className="space-y-6">
                    <header>
                        <h3 className="text-lg font-semibold text-primary">Work & Status</h3>
                        <p className="text-sm text-muted-foreground">Configuration and internal management.</p>
                        <div className="h-px bg-border mt-2" />
                    </header>

                    <div className="grid gap-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <FormLabel>Customer Type</FormLabel>
                                <Select value={data.type} onValueChange={val => setData("type", val as any)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corporate">Corporate</SelectItem>
                                        <SelectItem value="reseller">Reseller</SelectItem>
                                        <SelectItem value="personal">Personal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <FormLabel>Status</FormLabel>
                                <Select value={data.status} onValueChange={val => setData("status", val as any)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <FormLabel>Assigned Representative</FormLabel>
                            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={cn("w-full justify-between font-normal", !data.assigned_to && "text-muted-foreground")}>
                                        {data.assigned_to ? users.find(u => u.id === Number(data.assigned_to))?.name : "Select staff member"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search staff..." />
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup className="max-h-60 overflow-auto">
                                            {users.map(user => (
                                                <CommandItem key={user.id} onSelect={() => { setData("assigned_to", user.id); setOpenPopover(false); }}>
                                                    <Check className={cn("mr-2 h-4 w-4", data.assigned_to === user.id ? "opacity-100" : "opacity-0")} />
                                                    {user.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <ErrorMessage message={errors.assigned_to} />
                        </div>

                        <div className="grid gap-2">
                            <FormLabel>Addresses</FormLabel>
                            {data.addresses.map((addr, i) => (
                                <div key={`addr-${i}`} className="flex gap-2">
                                    <Textarea
                                        value={addr}
                                        onChange={e => updateListItem("addresses", i, e.target.value)}
                                        placeholder="Full address details..."
                                        className="min-h-20"
                                    />
                                    {data.addresses.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("addresses", i)} className="text-muted-foreground hover:text-destructive">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => addListItem("addresses")} className="w-full border-dashed">
                                <Plus className="w-4 h-4 mr-2" /> Add Another Address
                            </Button>
                        </div>

                        <div className="grid gap-2">
                            <FormLabel>Internal Remarks</FormLabel>
                            <Textarea value={data.remarks} onChange={e => setData("remarks", e.target.value)} placeholder="Any specific notes or preferences..." className="min-h-25" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
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
                        customer ? "Update Customer" : "Create Customer"
                    )}
                </Button>
            </footer>
        </form>
    );
}
