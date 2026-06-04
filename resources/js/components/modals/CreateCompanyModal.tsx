import React from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import FormLabel from '@/components/admin/form/FormLabel';
import { Company } from '@/types';

interface CreateCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (company: Company) => void;
}

export default function CreateCompanyModal({ isOpen, onClose, onSuccess }: CreateCompanyModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        website: "",
        address: "",
    });

    const { props } = usePage<SharedData>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('companies.store'), {
            onSuccess: () => {
                // Since companies might be loaded in multiple places, we might need a full refresh
                // or just rely on the onSuccess callback for the local component state.
                const newId = props.flash.new_id;

                router.reload({ only: ['companies'] });

                // We'll trust the caller to handle the update if they passed onSuccess
                // If they need the full object, we might need to fetch it or pass it via flash
                // For now, let's assume they just need the ID or the fact that it succeeded.
                // Actually, CustomerForm needs the full company object.
                // Let's modify the controller to flash the object too.

                if (onSuccess && newId) {
                   // We'll pass a partial object since we only have the ID and original data
                   onSuccess({ id: Number(newId), ...data });
                }

                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new company here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="grid gap-2">
                        <FormLabel required>Company Name</FormLabel>
                        <Input
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
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
                                onChange={e => setData("email", e.target.value)}
                                placeholder="info@acme.com"
                            />
                            <ErrorMessage message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <FormLabel>Phone</FormLabel>
                            <Input
                                value={data.phone}
                                onChange={e => setData("phone", e.target.value)}
                                placeholder="+880..."
                            />
                            <ErrorMessage message={errors.phone} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <FormLabel>Address</FormLabel>
                        <Textarea
                            value={data.address}
                            onChange={e => setData("address", e.target.value)}
                            placeholder="Full address details..."
                        />
                        <ErrorMessage message={errors.address} />
                    </div>
                    <div className="grid gap-2">
                        <FormLabel>Website</FormLabel>
                        <Input
                            value={data.website}
                            onChange={e => setData("website", e.target.value)}
                            placeholder="https://..."
                        />
                        <ErrorMessage message={errors.website} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Company"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
