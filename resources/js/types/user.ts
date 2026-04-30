export interface User {
    id: number;
    name: string;
    phone: string;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    assigned_user?: any;
}
