export interface User {
    id: number;
    name: string;
    phone: string;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    signature?: string | null;
    signature_url?: string | null;
}
