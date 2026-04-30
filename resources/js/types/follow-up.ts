export interface FollowUp {
    id: number;
    customer_id: number;
    user_id: number;
    follow_up_date: string;
    notes: string;
    status: 'price_shared' | 'negotiation' | 'purchase' | 'lost' | 'pending' | 'follow_up';
    priority: 'high' | 'medium' | 'low';
    completed_at: string | null;
    created_at: string;
    updated_at: string;
    customer?: any;
    user?: any;
}
