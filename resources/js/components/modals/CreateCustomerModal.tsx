import React from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, X } from 'lucide-react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import { GenericCombobox } from '@/components/admin/form/GenericCombobox';
import FormLabel from '@/components/admin/form/FormLabel';
import { Company, User } from '@/types';

interface CreateCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (customerId: number) => void;
    companies?: Company[];
    users?: User[];
}

export default function CreateCustomerModal({ isOpen, onClose, onSuccess, companies = [], users = [] }: CreateCustomerModalProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: "",
        designation: "",
        company_id: "",
        email: "",
        assigned_to: users.length === 1 ? users[0].id : "",
        status: "active",
        type: "corporate",
        phones: [""],
        addresses: [""],
        remarks: "",
    });

    const { props } = usePage<SharedData>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('customers.store'), {
            onSuccess: () => {
                const newId = props.flash.new_id;
                router.reload({ only: ['customers'] });
                if (onSuccess && newId) onSuccess(Number(newId));
                reset();
                onClose();
            },
        });
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
                            <FormLabel>Full Name</FormLabel>
                            <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="John Doe" />
                            <ErrorMessage message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <GenericCombobox
                                label="Company"
                                items={companies}
                                selectedId={data.company_id}
                                onSelect={(id) => setData("company_id", id as number)}
                                placeholder="Select company"
                            />
                            <ErrorMessage message={errors.company_id} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="john@example.com" />
                            <ErrorMessage message={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Designation</FormLabel>
                            <Input value={data.designation} onChange={e => setData("designation", e.target.value)} placeholder="Manager" />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Type</FormLabel>
                            <Select value={data.type} onValueChange={val => setData("type", val as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corporate">Corporate</SelectItem>
                                    <SelectItem value="reseller">Reseller</SelectItem>
                                    <SelectItem value="personal">Personal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Assigned Representative</FormLabel>
                            <Select value={String(data.assigned_to)} onValueChange={val => setData("assigned_to", parseInt(val))}>
                                <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                                <SelectContent>
                                    {users.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.assigned_to} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <FormLabel>Phone Numbers</FormLabel>
                        {data.phones.map((phone, i) => (
                            <div key={i} className="flex gap-2">
                                <Input value={phone} onChange={e => updateListItem("phones", i, e.target.value)} placeholder="017XXXXXXXX" />
                                {data.phones.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("phones", i)}><X className="w-4 h-4" /></Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addListItem("phones")} className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Phone</Button>
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Addresses</FormLabel>
                        {data.addresses.map((addr, i) => (
                            <div key={i} className="flex gap-2">
                                <Textarea value={addr} onChange={e => updateListItem("addresses", i, e.target.value)} placeholder="Address..." className="min-h-16" />
                                {data.addresses.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeListItem("addresses", i)}><X className="w-4 h-4" /></Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addListItem("addresses")} className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Address</Button>
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
