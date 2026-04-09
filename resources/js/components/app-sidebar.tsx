import { Link } from '@inertiajs/react';
import { CalendarIcon, ChartBarIcon, ClockIcon, CurlyBraces, DockIcon, HomeIcon, UsersIcon } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
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


const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: route('dashboard'), icon: HomeIcon },
    { title: 'Customers', href: route('customers.index'), icon: UsersIcon },
    { title: 'Products', href: route('products.index'), icon: CurlyBraces },
    { title: 'Follow-ups', href: route('follow-ups.index'), icon: ClockIcon },
    { title: 'Meetings', href: route('meetings.index'), icon: CalendarIcon },
    { title: 'Quotations', href: route('quotations.index'), icon: DockIcon },
    // { title: 'Reports', href: '/reports', icon: ChartBarIcon },
    { title: 'Users', href: '/users', icon: UsersIcon },

];



const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];



export function AppSidebar() {


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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
