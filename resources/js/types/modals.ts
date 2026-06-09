import type { CustomerType, Requirement} from "@/types";
import { User } from "@/types";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (data: any) => void;
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
