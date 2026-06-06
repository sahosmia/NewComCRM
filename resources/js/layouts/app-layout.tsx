import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { ModalRegistry } from '@/components/modals/ModalRegistry';
import { FlashMessage } from '@/components/flash-message';

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {

    return (
        <>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                <FlashMessage/>
                {children}
                <ModalRegistry />
            </AppLayoutTemplate>
        </>
    );
}
