import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, FileUp, Loader2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    importRoute: string;
    entityName: string;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, importRoute, entityName }) => {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        file: null as File | null,
    });

    const { errors: pageErrors } = usePage().props;
    const importErrors = (pageErrors?.import_errors as string[]) || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route(importRoute), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Import {entityName}</DialogTitle>
                    <DialogDescription>
                        Upload an Excel (.xlsx, .xls) or CSV file to import {entityName.toLowerCase()} records.
                        Ensure the column headers match the database fields.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="file">File</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="file"
                                type="file"
                                accept=".csv, .xlsx, .xls"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className={errors.file ? 'border-destructive' : ''}
                            />
                            {data.file && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setData('file', null)}
                                    className="h-9 w-9"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        {errors.file && (
                            <p className="text-xs text-destructive">{errors.file}</p>
                        )}
                    </div>

                    {(importErrors.length > 0 || pageErrors?.error) && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Import Failed</AlertTitle>
                            <AlertDescription>
                                {pageErrors?.error && <p className="mb-2 font-semibold">{pageErrors.error as string}</p>}
                                {importErrors.length > 0 && (
                                    <div className="max-h-[150px] mt-2 rounded-md border border-destructive/20 p-2 overflow-y-auto">
                                        <ul className="list-disc pl-4 text-xs space-y-1">
                                            {importErrors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing || !data.file}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                <>
                                    <FileUp className="mr-2 h-4 w-4" />
                                    Start Import
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ImportModal;
