import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { settings } = usePage<SharedData>().props;
    const appName = (settings?.app_name as string) || 'Crystal Vision Solutions';
    const logoUrl = settings?.logo ? `/storage/${settings.logo}` : '/logo.png';
    return (
        <img src={logoUrl} alt={appName} className="h-full w-full object-contain" />

    );
}
