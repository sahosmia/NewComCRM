import React from 'react';
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
import FormLabel from '@/components/admin/form/FormLabel';
import { Unit, Product } from '@/types';
import { useModalForm } from '@/hooks/use-modal-form';
import { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (product: Product) => void;
    units?: Unit[];
}

export default function CreateProductModal({ isOpen, onClose, onSuccess, units: initialUnits = [] }: CreateProductModalProps) {
    const { openModal } = useModal();
    const [localUnits, setLocalUnits] = useState<Unit[]>(initialUnits);

    const { data, setData, errors, processing, reset, submit } = useModalForm({
        name: "",
        unit_price: "",
        category: "",
        stock_quantity: "",
        supplier_name: "",
        source: "",
        description: "",
        unit_id: "",
    }, route('products.store'), {
        onSuccess: (product: Product) => {
            if (onSuccess) onSuccess(product);
            onClose();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
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
                            <FormLabel required>Product Name</FormLabel>
                            <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="Product Name" />
                            <ErrorMessage message={errors.name} />
                        </div>


                        <div className="space-y-2">
                            <FormLabel required>Unit Price</FormLabel>
                            <Input type="number" value={data.unit_price} onChange={e => setData("unit_price", e.target.value)} placeholder="0.00" />
                            <ErrorMessage message={errors.unit_price} />
                        </div>
                        <div className="space-y-2">
                            <GenericCombobox
                                required
                                label="Unit"
                                items={localUnits.map(unit => ({
                                    id: unit.id,
                                    name: unit.short_form ? `${unit.title} (${unit.short_form})` : unit.title
                                }))}
                                selectedId={data.unit_id}
                                onSelect={(id) => setData("unit_id", id as number)}
                                placeholder="Select a unit"
                                allowManualInput={false}
                                error={errors.unit_id}
                                renderAction={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal('CREATE_UNIT', {
                                                onSuccess: (newUnit: Unit) => {
                                                    setLocalUnits(prev => [...prev, newUnit]);
                                                    setData('unit_id', newUnit.id);
                                                }
                                            });
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Category</FormLabel>
                            <Input value={data.category} onChange={e => setData("category", e.target.value)} placeholder="Category" />
                            <ErrorMessage message={errors.category} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel required>Stock Quantity</FormLabel>
                            <Input type="number" value={data.stock_quantity} onChange={e => setData("stock_quantity", e.target.value)} placeholder="0" />
                            <ErrorMessage message={errors.stock_quantity} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <Textarea value={data.description} onChange={e => setData("description", e.target.value)} placeholder="Description..." />
                        <ErrorMessage message={errors.description} />
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
