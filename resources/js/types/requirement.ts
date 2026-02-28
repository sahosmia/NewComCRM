import { Customer } from "@/types/customer";
import { Product } from "@/types/product";

export interface Requirement {
    id: number;
    customer_id: number;
    product_id: number;
    quantity: number;
    unit_price: string;
    total_price: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    customer?: any; // Avoiding deep imports if not necessary for now
    product?: Product;
}
