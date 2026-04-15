export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role?: string;
    is_active?: boolean;
    company_name?: string;
    phone?: string;
    status?: string;
    assigned_user?: User;
    [key: string]: unknown;
}

export interface Customer {
    id: number;
    name: string;
    designation: string | null;
    company_name: string;
    phones: string[];
    addresses: string[];
    email: string | null;
    type: 'corporate' | 'reseller' | 'personal';
    assigned_to?: number | string;
    status: 'active' | 'inactive';
    remarks?: string;
    assigned_user?: User;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface Review {
    id: number;
    approved: boolean;
    approved_at: string | null;
    comment: string;
    product_id: number;
    rating: number;
    user_id: number;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    unit_price: number;
    brand: string;
    stock_quantity: number;
    discount_type: string | null;
    discount_value: number | null;
    category_id: number;
    image: string;
    is_active: boolean;
    category?: Category | string;
    discounted_price: number;
    image_url: string;
    reviews: Review[];
    another_product_description?: string;
    additional_information?: string | unknown[];
}

export interface Team {
    id: number;
    name: string;
    image: string;
    designation: string;
    facebook_url: string;
    instagram_url: string;
    image_url: string;
}

export interface Portfolio {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    thumbnail_url: string;
    description: string;
    project_url: string;
    slug: string;
}

export interface Cart {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product: Product;
    [key: string]: unknown;
}

export interface Coupon {
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

export interface Quotation {
    id: number;
    quotation_number: string;
    customer_id: number;
    customer?: Customer;
    quotation_date: string;
    total: number;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    created_at: string;
    updated_at: string;
}

export interface Meeting {
    id: number;
    title: string;
    customer_id: number;
    customer?: Customer;
    start_time: string;
    end_time: string;
    meeting_type: 'physical' | 'virtual' | 'phone';
    status: 'scheduled' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface Requirement {
    id: number;
    customer_id: number;
    customer?: Customer;
    product_id: number;
    product?: Product;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: string;
    updated_at: string;
}

export interface FollowUp {
    id: number;
    customer_id: number;
    customer?: Customer;
    follow_up_date: string;
    status: 'pending' | 'price_shared' | 'negotiation' | 'purchase' | 'lost' | 'follow_up';
    priority: 'high' | 'medium' | 'low';
    remarks?: string;
    created_at: string;
    updated_at: string;
}
