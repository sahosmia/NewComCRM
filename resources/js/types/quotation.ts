import { Product } from "./product";

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
