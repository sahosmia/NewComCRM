import { Customer } from "./customer";
import { Requirement } from "./requirement";

export interface Sale {
    id: number;
    customer_id: number;
    requirement_id: number;
    amount: string | number;
    sale_date: string;
    created_at: string;
    updated_at: string;
    customer?: Customer;
    requirement?: Requirement;
}
