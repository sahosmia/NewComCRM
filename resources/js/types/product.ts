import { Unit } from "./unit";

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
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    unit:Unit;
    unit_id:number;

}
