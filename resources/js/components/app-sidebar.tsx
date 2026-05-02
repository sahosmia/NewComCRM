import { Link, usePage } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

import {
    LayoutDashboard,
    Users,
    Package,
    PhoneCall,
    CalendarDays,
    FileText,
    ClipboardList,
    UserCog,
    BadgeDollarSign,
    Building2,
    Ruler
} from 'lucide-react';

export function AppSidebar() {

    const { auth } = usePage().props;
    const userRole = auth.user.role;



    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { title: 'Requirements', href: route('requirements.index'), icon: ClipboardList },
        { title: 'Follow-ups', href: route('follow-ups.index'), icon: PhoneCall },
        { title: 'Meetings', href: route('meetings.index'), icon: CalendarDays },
        { title: 'Quotations', href: route('quotations.index'), icon: FileText },
        { title: 'Sales', href: route('sales.index'), icon: BadgeDollarSign },
        { title: 'Products', href: route('products.index'), icon: Package },
        { title: 'Units', href: route('units.index'), icon: Ruler },
        { title: 'Customers', href: route('customers.index'), icon: Users },
        { title: 'Companies', href: route('companies.index'), icon: Building2 },
        {
            title: 'Users',
            href: route('users.index'),
            icon: UserCog,
            hidden: userRole !== 'super_admin'
        },

    ];

    const visibleNavItems = mainNavItems.filter(item => !item.hidden);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch={false}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
