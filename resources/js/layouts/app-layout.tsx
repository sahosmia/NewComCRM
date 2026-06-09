import { FlashMessage } from '@/components/flash-message';
import { ModalRegistry } from '@/components/modals/ModalRegistry';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

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
