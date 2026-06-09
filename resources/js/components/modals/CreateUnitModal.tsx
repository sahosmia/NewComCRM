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
import { useModalForm } from '@/hooks/use-modal-form';
import type { Unit } from '@/types';

interface CreateUnitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (unit: Unit) => void;
}

export default function CreateUnitModal({ isOpen, onClose, onSuccess }: CreateUnitModalProps) {
    const { data, setData, errors, processing, reset, clearErrors, submit } = useModalForm({
        title: '',
        short_form: '',
    }, route('units.store'), {
        onSuccess: (unit: Unit) => {
            if (onSuccess) onSuccess(unit);
            onClose();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
            clearErrors();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Unit</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <FormLabel required>Title</FormLabel>
                        <Input
                            id="title"
                            placeholder="e.g. Piece, Box"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoFocus
                        />
                        <ErrorMessage message={errors.title} />
                    </div>
                    <div className="space-y-2">
                        <FormLabel required>Short Form</FormLabel>
                        <Input
                            id="short_form"
                            placeholder="e.g. Pcs, Box"
                            value={data.short_form}
                            onChange={(e) => setData('short_form', e.target.value)}
                        />
                        <ErrorMessage message={errors.short_form} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Unit'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
