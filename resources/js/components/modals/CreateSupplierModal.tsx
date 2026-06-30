import { Loader2 } from 'lucide-react';
import React from 'react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import FormLabel from '@/components/admin/form/FormLabel';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useModalForm } from '@/hooks/use-modal-form';
import type { Supplier } from '@/types';

interface CreateSupplierModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (supplier: Supplier) => void;
}

export default function CreateSupplierModal({ isOpen, onClose, onSuccess }: CreateSupplierModalProps) {
    const { data, setData, errors, processing, reset, submit } = useModalForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
    }, route('suppliers.store'), {
        onSuccess: (supplier: Supplier) => {
            if (onSuccess) onSuccess(supplier);
            onClose();
            reset();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Supplier</DialogTitle>
                    <DialogDescription>Add a new supplier to the system.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <FormLabel required>Supplier Name</FormLabel>
                            <Input
                                value={data.name}
                                onChange={e => setData("name", e.target.value)}
                                placeholder="Supplier Name"
                                className={errors.name ? "border-red-500" : ""}
                            />
                            <ErrorMessage message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={e => setData("email", e.target.value)}
                                placeholder="supplier@example.com"
                            />
                            <ErrorMessage message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Phone</FormLabel>
                            <Input
                                value={data.phone}
                                onChange={e => setData("phone", e.target.value)}
                                placeholder="Phone Number"
                            />
                            <ErrorMessage message={errors.phone} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Address</FormLabel>
                        <Textarea
                            value={data.address}
                            onChange={e => setData("address", e.target.value)}
                            placeholder="Supplier Address..."
                            rows={3}
                        />
                        <ErrorMessage message={errors.address} />
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={data.description}
                            onChange={e => setData("description", e.target.value)}
                            placeholder="Additional details..."
                            rows={3}
                        />
                        <ErrorMessage message={errors.description} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Supplier'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
