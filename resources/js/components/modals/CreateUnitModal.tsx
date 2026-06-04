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
import { Loader2 } from 'lucide-react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import FormLabel from '@/components/admin/form/FormLabel';

interface CreateUnitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (unitId: number) => void;
}

export default function CreateUnitModal({ isOpen, onClose, onSuccess }: CreateUnitModalProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        short_form: '',
    });

    const { props } = usePage<SharedData>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('units.store'), {
            onSuccess: () => {
                // Access the flashed data if available
                const newUnitId = props.flash.new_id;

                // Partial reload to refresh units list on the current page
                router.reload({ only: ['units'] });

                if (onSuccess && newUnitId) {
                    onSuccess(Number(newUnitId));
                }

                reset();
                onClose();
            },
        });
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
