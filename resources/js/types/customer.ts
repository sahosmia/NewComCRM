import { User } from "./user";

export interface Customer {
    id: number;
    name: string;
    designation: string | null;
    company_id: number | null;
    company?: {
        id: number;
        name: string;
    };
    phone: string;
    email: string | null;
    address: string | null;
    assigned_to: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    assigned_user?: User;
    full_name_with_company:string
}
