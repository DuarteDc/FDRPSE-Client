import { ReactNode } from 'react';
import { ModalContent, ModalHeader, Modal as MainModal, ModalBody } from '@nextui-org/react';

interface Props {
    className      ?:   string;
    isOpen          :   boolean;
    title           :   string;
    onChange        :   () => void;
    renderContent   :   (onClose: () => void) => ReactNode;
    size            :   any;
    hideCloseButton?:   boolean;
}

export const Modal = ({ title, renderContent, onChange, ...props }: Props) => {
    return (
        <MainModal onOpenChange={onChange} isDismissable={false} {...props} scrollBehavior="outside" isKeyboardDismissDisabled>
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


