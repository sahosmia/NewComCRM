import { usePage } from '@inertiajs/react';
import { Loader2, Plus, X } from 'lucide-react';
import React from 'react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import FormLabel from '@/components/admin/form/FormLabel';
import { GenericCombobox } from '@/components/admin/form/GenericCombobox';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useModalForm } from '@/hooks/use-modal-form';
import type { Company, User, CustomerType } from '@/types';

interface CreateCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (customer: CustomerType) => void;
    companies?: Company[];
    users?: User[];
}

export default function CreateCustomerModal({ isOpen, onClose, onSuccess, companies = [], users = [] }: CreateCustomerModalProps) {
    const { auth } = usePage().props as any;
    const isSuperAdmin = auth.user.role === 'super_admin';

    const { data, setData, errors, processing, reset, submit } = useModalForm({
        name: "",
        designation: "",
        company_id: "",
        email: "",
        assigned_to: isSuperAdmin ? (users.length === 1 ? users[0].id : "") : auth.user.id,
        status: "active",
        type: "corporate",
        phones: [""],
        addresses: [""],
        remarks: "",
    }, route('customers.store'), {
        onSuccess: (customer: CustomerType) => {
            if (onSuccess) onSuccess(customer);
            onClose();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    const updateListItem = (key: "phones" | "addresses", index: number, value: string) => {
        const newList = [...data[key]];
        newList[index] = value;
        setData(key, newList);
    };

    const addListItem = (key: "phones" | "addresses") => setData(key, [...data[key], ""]);

    const removeListItem = (key: "phones" | "addresses", index: number) => {
        if (data[key].length > 1) {
            setData(key, data[key].filter((_, i) => i !== index));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Customer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormLabel required>Full Name</FormLabel>
                            <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="John Doe" />
                            <ErrorMessage message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <GenericCombobox
                                required={data.type !== 'personal'}
                                label="Company"
                                items={companies}
                                selectedId={data.company_id}
                                onSelect={(id) => setData("company_id", id as number)}
                                placeholder="Select company"
                                error={errors.company_id}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormLabel required={data.type !== 'personal'}>Email</FormLabel>
                            <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="john@example.com" />
                            <ErrorMessage message={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel required={data.type !== 'personal'}>Designation</FormLabel>
                            <Input value={data.designation} onChange={e => setData("designation", e.target.value)} placeholder="Manager" />
                            <ErrorMessage message={errors.designation} />
                        </div>

                        <div className="space-y-2">
                            <FormLabel required>Type</FormLabel>
                            <Select value={data.type} onValueChange={val => setData("type", val as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corporate">Corporate</SelectItem>
                                    <SelectItem value="reseller">Reseller</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.type} />
                        </div>

                        {isSuperAdmin && (
                            <div className="space-y-2">
                                <GenericCombobox
                                    required
                                    label="Responsible User"
                                    items={users}
                                    selectedId={data.assigned_to}
                                    onSelect={(id) => setData("assigned_to", id as number)}
                                    placeholder="Select User"
                                    error={errors.assigned_to}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <FormLabel required>Phone Numbers</FormLabel>
                        {data.phones.map((phone, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex gap-2">
                                    <Input value={phone} onChange={e => updateListItem("phones", i, e.target.value)} placeholder="017XXXXXXXX" />
                                    {data.phones.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("phones", i)}><X className="w-4 h-4" /></Button>
                                    )}
                                </div>
                                <ErrorMessage message={errors[`phones.${i}` as keyof typeof errors]} />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addListItem("phones")} className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Phone</Button>
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Addresses</FormLabel>
                        {data.addresses.map((addr, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex gap-2">
                                    <Textarea value={addr} onChange={e => updateListItem("addresses", i, e.target.value)} placeholder="Address..." className="min-h-16" />
                                    {data.addresses.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("addresses", i)}><X className="w-4 h-4" /></Button>
                                    )}
                                </div>
                                <ErrorMessage message={errors[`addresses.${i}` as keyof typeof errors]} />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addListItem("addresses")} className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Address</Button>
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Internal Remarks</FormLabel>
                        <Textarea value={data.remarks} onChange={e => setData("remarks", e.target.value)} placeholder="Any specific notes..." className="min-h-16" />
                        <ErrorMessage message={errors.remarks} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Customer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
