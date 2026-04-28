import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus, Users, ClipboardList, PhoneCall, CalendarDays, UserPlus } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.role;

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" className="h-8 gap-1.5 px-3">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Quick Create</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href={route('customers.create')} className="cursor-pointer">
                                <Users className="mr-2 h-4 w-4" />
                                <span>Customer</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('requirements.create')} className="cursor-pointer">
                                <ClipboardList className="mr-2 h-4 w-4" />
                                <span>Requirement</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('follow-ups.create')} className="cursor-pointer">
                                <PhoneCall className="mr-2 h-4 w-4" />
                                <span>Follow-up</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('meetings.create')} className="cursor-pointer">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                <span>Meeting</span>
                            </Link>
                        </DropdownMenuItem>
                        {userRole === 'super_admin' && (
                            <DropdownMenuItem asChild>
                                <Link href={route('users.create')} className="cursor-pointer">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>User</span>
                                </Link>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
