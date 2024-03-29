import { ReactNode } from 'react';
import { ModalContent, ModalHeader, Modal as MainModal, ModalBody } from '@nextui-org/react';

interface Props {
    className       ?:   string;
    isOpen           :   boolean;
    title           ?:   string;
    onChange         :   () => void;
    renderContent    :   (onClose: () => void) => ReactNode;
    size             :   any;
    hideCloseButton ?:   boolean;
    closeButton     ?:   ReactNode
    isKeyboardDismissDisabled ?: boolean;
}

export const Modal = ({ title = '', renderContent, onChange, isKeyboardDismissDisabled = false, ...props }: Props) => {
    return (
        <MainModal 
            onOpenChange={onChange} 
            isDismissable={false} 
            scrollBehavior="outside" 
            isKeyboardDismissDisabled={isKeyboardDismissDisabled} 
            className="rounded-lg border-2"
            {...props} 
            >
            <ModalContent className="overflow-y-auto">
                {(onClose) => (
                    <>
                        <ModalHeader className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold">{title}</ModalHeader>
                        <ModalBody>
                            {renderContent(onClose)}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </MainModal >
    )
}


