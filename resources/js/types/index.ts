import type { BreadcrumbItem } from './breadcrumb';
import type { User, Customer, Product, Coupon } from './models';
import type { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import type { ReactNode } from 'react';

export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './models';
export type * from './breadcrumb';

export interface Auth {
    user: User;
}

export interface SharedProps {
    [key: string]: unknown;
    auth: Auth;
    flash: {
        success?: string;
        error?: string;
    };
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavItemWithSubmenu extends NavItem {
    submenu?: NavItem[] | null;
}

export interface SharedData extends SharedProps {
    name: string;
    quote: { message: string; author: string };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationType<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
}

export interface FilterOption {
    name: string;
    label: string;
    type: 'searchSelect' | 'select' | 'date' | 'date_range';
    options?: { label: string; value: string | number }[];
}

export interface SortOption {
    label: string;
    sort: string;
    direction: 'asc' | 'desc';
}

export interface CommonTableProps<T> {
    data: PaginationType<T>;
    columns: Column<T>[];
    create_route: string;
    routeName: string;
    filters: FilterOption[];
    sortOptions: SortOption[];
}
