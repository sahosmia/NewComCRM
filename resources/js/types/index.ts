export type * from './auth';
export type * from './navigation';
export type * from './ui';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface SharedProps {
    [key: string]: unknown;
    auth: {
        user: null;
    };
}
export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    hidden?: boolean;

}
export interface NavItemWithSubmenu extends NavItem {
    submenu?: NavItem[] | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone?: string | null;
    designation?: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    signature?: string | null;
    signature_url?: string | null;
    [key: string]: unknown;
}

export interface Sale {
    id: number;
    customer_id: number;
    requirement_id: number;
    amount: string | number;
    sale_date: string;
    created_at: string;
    updated_at: string;
    customer?: CustomerType;
    requirement?: Requirement;
}


export interface CustomerType {
    id: number;
    name: string;
    designation: string;
    company_id: number;
    company?: Company;
    phones: string[];
    addresses: string[];
    email: string;
    type: 'corporate' | 'reseller' | 'personal';
    assigned_to?: number | string;
    status: 'active' | 'inactive';
    remarks?: string;
    assigned_user?: User;
    created_at: string;
    updated_at: string;
    full_name_with_company: string
    deleted_at?: string | null;
}

export interface Meeting {
    id: number;
    customer_id: number;
    user_id: number;
    title: string;
    scheduled_at: string;
    meeting_type: 'physical' | 'virtual' | 'phone';
    location: string | null;
    agenda: string | null;
    notes: string | null;
    status: 'scheduled' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    customer?: CustomerType;
    user?: User;
}




export interface Product {
    id: number;
    name: string;
    brand: string | null;
    model: string | null;
    unit_price: string;
    description: string | null;
    category: string | null;
    stock_quantity: number;
    supplier_name: string | null;
    source: string | null;
    warranty: number | null;
    warranty_duration_unit: 'months' | 'years' | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    unit: Unit;
    unit_id: number;
}

export interface RequirementItem {
    id?: number;
    requirement_id?: number;
    product_id: number;
    quantity: number;
    unit_price: string | number;
    total_price?: string | number;
    product?: Product;
    created_at?: string;
    updated_at?: string;
    description?: string;
}

export interface Requirement {
    id: number;
    customer_id: number;
    title: string | null;
    grand_total: string | number;
    status: 'pending' | 'approved' | 'processing' | 'purchased' | 'cancel';
    notes: string | null;

    has_ait: boolean;
    ait_percentage: string | number;
    has_vat: boolean;
    vat_percentage: string | number;

    has_accessories: boolean;
    accessories_title: string | null;
    accessories_quantity: string | number | null;
    accessories_unit_id: number | null;
    accessories_price: string | number | null;

    has_installation: boolean;
    installation_title: string | null;
    installation_quantity: string | number | null;
    installation_unit_id: number | null;
    installation_price: string | number | null;

    price_validity_days: number | null;
    delivery_time_days: number | null;
    advance_payment: number;
    before_payment: number;
    delivery_location: string | null;

    created_at: string;
    updated_at: string;

    customer?: CustomerType;
    items?: RequirementItem[];
    accessoriesUnit?: Unit;
    installationUnit?: Unit;
}

export interface FollowUp {
    id: number;
    customer_id: number;
    user_id: number;
    follow_up_date: string;
    notes: string;
    status: 'price_shared' | 'negotiation' | 'purchase' | 'lost' | 'pending' | 'follow_up';
    priority: 'high' | 'medium' | 'low';
    completed_at: string | null;
    created_at: string;
    updated_at: string;
    customer?: CustomerType;
    user?: User;
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


export interface AuthType {
    user: {
        id: number;
        name: string;
        email: string;
    }[] | null;
}


export interface Unit {
    id: number;
    title: string;
    short_form: string;
    created_at: string;
    updated_at: string;
}

export interface QuotationItem {
    id: number;
    quotation_id: number;
    product_id: number;
    description: string;
    quantity: number;
    unit_price: string;
    total: string;
    product?: Product;
}

export interface Quotation {
    id: number;
    quotation_number: string;
    customer_id: number;
    user_id: number;
    quotation_date: string;
    valid_until: string;
    subtotal: string;
    tax: string;
    discount: string;
    total: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    terms_conditions: string | null;
    notes: string | null;
    pdf_path: string | null;
    created_at: string;
    updated_at: string;
    customer?: any;
    user?: any;
    items?: QuotationItem[];
}




export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    is_active: boolean;
    signature?: string | null;
    signature_url?: string | null;
}
export interface UserTypeforForm {
    id: number;
    name: string;
}
export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}



export interface CouponType {
    id: number;
    coupon_code: string;
    discount_value: number | null;
    min_order_amount: number | null;
    usage_limit: number | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
    is_active: boolean;
    discount_type: "fixed_amount" | "percentage";
    created_at: string;
    updated_at: string;
    used_count: number;
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


export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}



export interface CommonTableProps<T> {
    data: PaginationType<T>;
    columns: Column<T>[];
    create_route?: string;
    routeName: string;
    filters?: FilterOption[];
    sortOptions?: SortOption[];
    dataKey?: string;
    bulkDeleteRoute?: string;
    entityName?: string;
}


export interface Company {
    id: number, name: string;
}
