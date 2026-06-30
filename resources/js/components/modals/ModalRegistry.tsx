import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import CreateCompanyModal from './CreateCompanyModal';
import CreateCustomerModal from './CreateCustomerModal';
import CreateFollowUpModal from './CreateFollowUpModal';
import CreateMeetingModal from './CreateMeetingModal';
import CreateProductModal from './CreateProductModal';
import CreateSupplierModal from './CreateSupplierModal';
import CreateUnitModal from './CreateUnitModal';

const MODAL_COMPONENTS: Record<string, React.ComponentType<any>> = {
    CREATE_UNIT: CreateUnitModal,
    CREATE_CUSTOMER: CreateCustomerModal,
    CREATE_PRODUCT: CreateProductModal,
    CREATE_COMPANY: CreateCompanyModal,
    CREATE_MEETING: CreateMeetingModal,
    CREATE_FOLLOW_UP: CreateFollowUpModal,
    CREATE_SUPPLIER: CreateSupplierModal,
};

export function ModalRegistry() {
    const { modals, closeModal } = useModal();

    if (modals.length === 0) return null;

    return (
        <>
            {modals.map((modalState, index) => {
                const Component = MODAL_COMPONENTS[modalState.type];
                if (!Component) {
                    console.warn(`No component found for modal type: ${modalState.type}`);
                    return null;
                }

                const isLast = index === modals.length - 1;

                return (
                    <Component
                        key={modalState.id}
                        {...modalState.props}
                        isOpen={true}
                        onClose={isLast ? closeModal : () => { }} // Only top modal can be closed via its own onClose if triggered by overlay
                    />
                );
            })}
        </>
    );
}
