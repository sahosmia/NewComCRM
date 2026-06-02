import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import CreateUnitModal from './CreateUnitModal';
import CreateCustomerModal from './CreateCustomerModal';
import CreateProductModal from './CreateProductModal';
import CreateCompanyModal from './CreateCompanyModal';
import CreateMeetingModal from './CreateMeetingModal';
import CreateFollowUpModal from './CreateFollowUpModal';

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
