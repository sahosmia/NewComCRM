import { Link, usePage } from '@inertiajs/react';
import { CalendarIcon, ClockIcon, CurlyBraces, DockIcon, HomeIcon, UsersIcon } from 'lucide-react';
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










export function AppSidebar() {

    const { auth } = usePage().props;
    const userRole = auth.user.role;



    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: route('dashboard'), icon: HomeIcon },
        { title: 'Customers', href: route('customers.index'), icon: UsersIcon },
        { title: 'Products', href: route('products.index'), icon: CurlyBraces },
        { title: 'Follow-ups', href: route('follow-ups.index'), icon: ClockIcon },
        { title: 'Meetings', href: route('meetings.index'), icon: CalendarIcon },
        { title: 'Quotations', href: route('quotations.index'), icon: DockIcon },
        { title: 'Requirements', href: route('requirements.index'), icon: DockIcon },
        {
            title: 'Users',
            href: route('users.index'),
            icon: UsersIcon,
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
                            <Link href={route('dashboard')} prefetch>
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
