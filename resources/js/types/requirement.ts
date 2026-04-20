import { Customer } from "@/types/customer";
import { Product } from "@/types/product";

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
}

export interface Requirement {
    id: number;
    customer_id: number;
    grand_total: string | number;
    status: 'pending' | 'approved' | 'processing' | 'completed' | 'cancelled';
    notes: string | null;
    created_at: string;
    updated_at: string;

    customer?: Customer;
    items?: RequirementItem[];
}
