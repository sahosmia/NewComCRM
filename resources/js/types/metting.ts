export interface Meeting {
    id: number;
    customer_id: number;
    user_id: number;
    title: string;
    start_time: string;
    end_time: string;
    meeting_type: 'physical' | 'virtual' | 'phone';
    location: string | null;
    agenda: string | null;
    notes: string | null;
    status: 'scheduled' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    customer?: any;
    user?: any;
}
