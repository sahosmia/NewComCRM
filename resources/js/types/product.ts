export interface Product {
    id: number;
    name: string;
    brand: string | null;
    unit_price: string; // Decimal from Laravel is often a string in JS
    description: string | null;
    category: string | null;
    stock_quantity: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
