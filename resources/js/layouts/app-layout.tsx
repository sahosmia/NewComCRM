import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';
import { ModalProvider } from '@/contexts/ModalContext';
import { ModalRegistry } from '@/components/modals/ModalRegistry';

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
                <ModalRegistry />
            </AppLayoutTemplate>
            <Toaster richColors position="top-right" />
        </>
    );
}
