import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ModalType = 'CREATE_UNIT' | 'CREATE_COMPANY' | 'CREATE_CUSTOMER' | 'CREATE_PRODUCT' | 'CREATE_MEETING' | 'CREATE_FOLLOW_UP';

interface ModalState {
    type: ModalType | null;
    props: Record<string, any>;
}

interface ModalContextType {
    openModal: (type: ModalType, props?: Record<string, any>) => void;
    closeModal: () => void;
    modal: ModalState;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modal, setModal] = useState<ModalState>({
        type: null,
        props: {},
    });

    const openModal = useCallback((type: ModalType, props: Record<string, any> = {}) => {
        setModal({ type, props });
    }, []);

    const closeModal = useCallback(() => {
        setModal({ type: null, props: {} });
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
