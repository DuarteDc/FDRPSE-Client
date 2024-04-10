import { ReactNode } from 'react';
import { ModalContent, ModalHeader, Modal as MainModal, ModalBody } from '@nextui-org/react';

interface Props {
    className       ?:   string;
    isOpen           :   boolean;
    title           ?:   string;
    onChange         :   () => void;
    renderContent    :   (onClose: () => void) => ReactNode;
    size             :   'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
    hideCloseButton ?:   boolean;
    closeButton     ?:   ReactNode
    isKeyboardDismissDisabled ?: boolean;
    backdrop ?: 'blur' | 'opaque' | 'transparent';
    placement?: 'auto' | 'top' | 'center' | 'bottom';
    scrollBehavior? : 'outside' | 'inside';
}

export const Modal = ({ title = '', renderContent, onChange, isKeyboardDismissDisabled = false, scrollBehavior = 'outside', ...props }: Props) => {
    return (
        <MainModal 
            onOpenChange={onChange} 
            isDismissable={false} 
            isKeyboardDismissDisabled={isKeyboardDismissDisabled} 
            className="rounded-lg border-2"
            scrollBehavior={scrollBehavior}
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


