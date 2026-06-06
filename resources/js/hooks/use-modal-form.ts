import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

export function useModalForm<TForm extends Record<string, any>>(
    initialData: TForm,
    submitUrl: string,
    options: {
        onSuccess?: (data: any) => void;
    } = {}
) {
    const { data, setData, errors, setError, reset, clearErrors } = useForm(initialData);
    const [processing, setProcessing] = useState(false);

    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        setProcessing(true);
        clearErrors();

        try {
            const response = await axios.post(submitUrl, data, {
                headers: {
                    'X-Inertia-Modal-Submit': 'true',
                },
            });

            if (response.data.success) {
                toast.success(response.data.message || 'Saved successfully');
                if (options.onSuccess) {
                    options.onSuccess(response.data.data);
                }
                reset();
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                setError(error.response.data.errors);
            } else {
                toast.error(error.response?.data?.message || 'An unexpected error occurred');
                console.error('Modal form submission error:', error);
            }
        } finally {
            setProcessing(false);
        }
    };

    return {
        data,
        setData,
        errors,
        processing,
        reset,
        clearErrors,
        submit,
    };
}
