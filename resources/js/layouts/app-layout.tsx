import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}

            <Toaster richColors position="top-right" />
        </AppLayoutTemplate>
    );
}
