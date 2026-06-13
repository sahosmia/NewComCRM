import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const { settings } = usePage<SharedData>().props;
    const appName = (settings?.app_name as string) || 'Crystal Vision Solutions';
    const logoUrl = settings?.logo ? `/storage/${settings.logo}` : '/logo.png';

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                {logoUrl ? (
                    <img src={logoUrl} alt={appName} className="h-full w-full object-contain" />
                ) : (
                    <AppLogoIcon />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {appName}
                </span>
            </div>
        </>
    );
}
