import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';

export type ModalType = 'CREATE_UNIT' | 'CREATE_COMPANY' | 'CREATE_CUSTOMER' | 'CREATE_PRODUCT' | 'CREATE_MEETING' | 'CREATE_FOLLOW_UP' | 'CREATE_SUPPLIER';

interface ModalState {
    type: ModalType;
    props: Record<string, any>;
    id: string;
}

interface ModalContextType {
    openModal: (type: ModalType, props?: Record<string, any>) => void;
    closeModal: () => void;
    modals: ModalState[];
    modal: { type: ModalType | null; props: Record<string, any> };
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modals, setModals] = useState<ModalState[]>([]);

    const openModal = useCallback((type: ModalType, props: Record<string, any> = {}) => {
        setModals(prev => [...prev, {
            type,
            props,
            id: Math.random().toString(36).substring(2, 9)
        }]);
    }, []);

    const closeModal = useCallback(() => {
        setModals(prev => prev.slice(0, -1));
    }, []);

    const topModal = modals.length > 0 ? modals[modals.length - 1] : { type: null, props: {} };

    return (
        <ModalContext.Provider value={{
            openModal,
            closeModal,
            modals,
            modal: topModal as any
        }}>
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
