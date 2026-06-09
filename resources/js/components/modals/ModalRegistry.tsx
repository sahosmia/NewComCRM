import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import CreateCompanyModal from './CreateCompanyModal';
import CreateCustomerModal from './CreateCustomerModal';
import CreateFollowUpModal from './CreateFollowUpModal';
import CreateMeetingModal from './CreateMeetingModal';
import CreateProductModal from './CreateProductModal';
import CreateUnitModal from './CreateUnitModal';

const MODAL_COMPONENTS: Record<string, React.ComponentType<any>> = {
    CREATE_UNIT: CreateUnitModal,
    CREATE_CUSTOMER: CreateCustomerModal,
    CREATE_PRODUCT: CreateProductModal,
    CREATE_COMPANY: CreateCompanyModal,
    CREATE_MEETING: CreateMeetingModal,
    CREATE_FOLLOW_UP: CreateFollowUpModal,
};

export function ModalRegistry() {
    const { modal, closeModal } = useModal();

    if (!modal.type) return null;

    const Component = MODAL_COMPONENTS[modal.type];

    if (!Component) {
        console.warn(`No component found for modal type: ${modal.type}`);
        return null;
    }

    return <Component {...modal.props} isOpen={!!modal.type} onClose={closeModal} />;
}
