import { Customer } from "@/types/customer";
import { Product } from "@/types/product";
import { Unit } from "@/types/unit";

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

    customer?: Customer;
    items?: RequirementItem[];
    accessoriesUnit?: Unit;
    installationUnit?: Unit;
}
