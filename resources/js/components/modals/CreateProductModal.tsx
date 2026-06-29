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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useModalForm } from '@/hooks/use-modal-form';
import type { Unit, Product, Supplier } from '@/types';
import { GenericCombobox } from '../admin/form/GenericCombobox';
import { useModal } from '@/contexts/ModalContext';
import { Plus } from 'lucide-react';

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (product: Product) => void;
    units?: Unit[];
    suppliers?: Supplier[];
}

export default function CreateProductModal({ isOpen, onClose, onSuccess, units = [], suppliers = [] }: CreateProductModalProps) {
    const { openModal } = useModal();
    const [localSuppliers, setLocalSuppliers] = React.useState<Supplier[]>(suppliers);

    const { data, setData, errors, processing, reset, submit } = useModalForm({
        name: "",
        costing_price: "",
        unit_price: "",
        category: "",
        stock_quantity: "",
        supplier_id: "",
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
                            <FormLabel>Costing Price</FormLabel>
                            <Input type="number" value={data.costing_price} onChange={e => setData("costing_price", e.target.value)} placeholder="0.00" />
                            <ErrorMessage message={errors.costing_price} />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Sale Price</FormLabel>
                            <Input type="number" value={data.unit_price} onChange={e => setData("unit_price", e.target.value)} placeholder="0.00" />
                            <ErrorMessage message={errors.unit_price} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel required>Unit</FormLabel>
                            <Select value={String(data.unit_id)} onValueChange={val => setData("unit_id", val)}>
                                <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
                                <SelectContent>
                                    {units.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.unit_id} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Category</FormLabel>
                            <Input value={data.category} onChange={e => setData("category", e.target.value)} placeholder="Category" />
                            <ErrorMessage message={errors.category} />
                        </div>

                         <div className="space-y-2">
                            <FormLabel>Stock Quantity</FormLabel>
                            <Input type="number" value={data.stock_quantity} onChange={e => setData("stock_quantity", e.target.value)} placeholder="0" />
                            <ErrorMessage message={errors.stock_quantity} />
                        </div>

                        {/* Supplier */}
                        <div className="space-y-2">
                            <GenericCombobox
                                label="Supplier"
                                items={localSuppliers.map(s => ({ id: s.id, name: s.name }))}
                                selectedId={data.supplier_id}
                                onSelect={(id) => setData("supplier_id", id as number)}
                                placeholder="Select Supplier"
                                searchPlaceholder="Search suppliers..."
                                error={errors.supplier_id}
                                renderAction={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal('CREATE_SUPPLIER', {
                                                onSuccess: (newSupplier: Supplier) => {
                                                    setLocalSuppliers(prev => [...prev, newSupplier]);
                                                    setData("supplier_id", newSupplier.id);
                                                }
                                            });
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>

                        {/* Source */}
                        <div className="space-y-2">
                            <FormLabel>Source</FormLabel>
                            <Input value={data.source} onChange={e => setData("source", e.target.value)} placeholder="Source" />
                            <ErrorMessage message={errors.source} />
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
