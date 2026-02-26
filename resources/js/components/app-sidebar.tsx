import { Link } from '@inertiajs/react';
import { BookOpen, CalendarIcon, ChartBarIcon, ClockIcon, CurlyBraces, DockIcon, Folder, HomeIcon, LayoutGrid, User, Users, UsersIcon } from 'lucide-react';
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
import { dashboard } from '@/routes';

// {
//     title: 'Dashboard',
//     href: dashboard(),
//     icon: LayoutGrid,
// },
// {
//     title: 'Coustomers',
//     href: customerIndex(),
//     icon: User,
// },




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

interface AppSidebarProps {
  user: {
    role: 'super_admin' | 'user';
    name: string;
    email: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {

    const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { title: 'Customers', href: '/customers', icon: UsersIcon },
    { title: 'Products', href: '/products', icon: CurlyBraces },
    { title: 'Follow-ups', href: '/follow-ups', icon: ClockIcon },
    { title: 'Meetings', href: '/meetings', icon: CalendarIcon },
    { title: 'Quotations', href: '/quotations', icon: DockIcon },
    { title: 'Reports', href: '/reports', icon: ChartBarIcon },
        ...(user?.role === 'super_admin' ? [
            { title: 'Users', href: '/users', icon: Users }
        ] : [])
];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
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
