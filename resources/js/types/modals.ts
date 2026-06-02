import { CustomerType, Requirement, User } from "@/types";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (id: number) => void;
}

export interface CreateMeetingModalProps extends BaseModalProps {
    customer_id?: number;
    requirement_id?: number;
    customers?: CustomerType[];
    requirements?: Requirement[];
}

export interface CreateFollowUpModalProps extends BaseModalProps {
    customer_id?: number;
    requirement_id?: number;
    customers?: CustomerType[];
    requirements?: Requirement[];
}
