import { useForm } from "@inertiajs/react";
import { Check, ChevronsUpDown, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CustomerType } from "@/types";

interface User { id: number; name: string; }
interface Props { customer?: CustomerType; users: User[]; }

export default function CustomerForm({ customer, users }: Props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        name: customer?.name || "",
        designation: customer?.designation || "",
        company_name: customer?.company_name || "",
        email: customer?.email || "",
        assigned_to: customer?.assigned_to || "",
        status: customer?.status || "active",
        type: customer?.type || "corporate",
        phones: customer?.phones || [""],
        addresses: customer?.addresses || [""],
        remarks: customer?.remarks || "",
    });

    // --- Handlers ---
    const handleListUpdate = (key: "phones" | "addresses", index: number, value: string) => {
        const newList = [...data[key]];
        newList[index] = value;
        setData(key, newList);
    };

    const addListItem = (key: "phones" | "addresses") => setData(key, [...data[key], ""]);

    const removeListItem = (key: "phones" | "addresses", index: number) => {
        setData(key, data[key].filter((_, i) => i !== index));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        customer ? put(route("customers.update", customer.id)) : post(route("customers.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-8 p-6 rounded-xl border shadow-sm">

            {/* Section 1: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 text-primary">Identity</h3>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="John Doe" />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="john@example.com" />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 text-primary">Work & Status</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Customer Type</label>
                            <Select value={data.type} onValueChange={val => setData("type", val as "corporate" | "reseller" | "personal")}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corporate">Corporate</SelectItem>
                                    <SelectItem value="reseller">Reseller</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={data.status} onValueChange={val => setData("status", val as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Assigned Representative</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("w-full justify-between font-normal", !data.assigned_to && "text-muted-foreground")}>
                                    {data.assigned_to ? users.find(u => u.id === Number(data.assigned_to))?.name : "Select staff..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                    <CommandInput placeholder="Search staff..." />
                                    <CommandEmpty>No staff found.</CommandEmpty>
                                    <CommandGroup className="max-h-48 overflow-auto">
                                        {users.map(user => (
                                            <CommandItem key={user.id} onSelect={() => { setData("assigned_to", user.id); setOpen(false); }}>
                                                <Check className={cn("mr-2 h-4 w-4", data.assigned_to === user.id ? "opacity-100" : "opacity-0")} />
                                                {user.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* Section 2: Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input value={data.company_name} onChange={e => setData("company_name", e.target.value)} placeholder="Acme Corp" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Designation</label>
                    <Input value={data.designation} onChange={e => setData("designation", e.target.value)} placeholder="Purchasing Manager" />
                </div>
            </div>

            {/* Section 3: Contact List (Phones) */}
            <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold text-primary">Contact Numbers</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => addListItem("phones")}><Plus className="w-4 h-4 mr-1"/> Add Phone</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.phones.map((phone, i) => (
                        <div key={i} className="flex gap-2">
                            <Input value={phone} onChange={e => handleListUpdate("phones", i, e.target.value)} placeholder={`Phone #${i+1}`} />
                            {data.phones.length > 1 && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("phones", i)} className="text-destructive"><X className="w-4 h-4"/></Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 4: Address List */}
            <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold text-primary">Addresses</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => addListItem("addresses")}><Plus className="w-4 h-4 mr-1"/> Add Address</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.addresses.map((addr, i) => (
                        <div key={i} className="relative group">
                            <Textarea value={addr} onChange={e => handleListUpdate("addresses", i, e.target.value)} placeholder={`Location details #${i+1}`} className="min-h-[80px] pr-10" />
                            {data.addresses.length > 1 && (
                                <button type="button" onClick={() => removeListItem("addresses", i)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4"/></button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 5: Remarks */}
            <div className="space-y-1 pt-4">
                <label className="text-sm font-medium text-primary">Internal Remarks</label>
                <Textarea value={data.remarks} onChange={e => setData("remarks", e.target.value)} placeholder="Notes about this customer..." className="min-h-[100px]" />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" disabled={processing} className="px-8">
                    {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                    {customer ? "Save Changes" : "Create Customer"}
                </Button>
            </div>
        </form>
    );
}
