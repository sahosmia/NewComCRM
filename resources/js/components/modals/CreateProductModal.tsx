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
import { Loader2 } from 'lucide-react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import { GenericCombobox } from '@/components/admin/form/GenericCombobox';
import FormLabel from '@/components/admin/form/FormLabel';
import { Unit } from '@/types';

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (productId: number) => void;
    units?: Unit[];
}

export default function CreateProductModal({ isOpen, onClose, onSuccess, units = [] }: CreateProductModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        unit_price: "",
        category: "",
        stock_quantity: "",
        supplier_name: "",
        source: "",
        description: "",
        unit_id: "",
    });

    const { props } = usePage<SharedData>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                const newId = props.flash.new_id;
                router.reload({ only: ['products'] });
                if (onSuccess && newId) onSuccess(Number(newId));
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <FormLabel>Product Name</FormLabel>
                            <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="Product Name" />
                            <ErrorMessage message={errors.name} />
                        </div>


                        <div className="space-y-2">
                            <FormLabel>Unit Price</FormLabel>
                            <Input type="number" value={data.unit_price} onChange={e => setData("unit_price", e.target.value)} placeholder="0.00" />
                            <ErrorMessage message={errors.unit_price} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Unit</FormLabel>
                            <Select value={String(data.unit_id)} onValueChange={val => setData("unit_id", val)}>
                                <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
                                <SelectContent>
                                    {units.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.unit_id} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <Textarea value={data.description} onChange={e => setData("description", e.target.value)} placeholder="Description..." />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
