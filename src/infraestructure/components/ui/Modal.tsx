import { MouseEventHandler, ReactNode } from 'react';
import { ModalContent, ModalHeader, Modal as MainModal, ModalBody } from '@nextui-org/react';

interface Props {
    className      ?:  string;
    isOpen          :   boolean;
    title           :   string;
    onChange        :   () => void;
    renderContent   :   (onClose: MouseEventHandler<HTMLButtonElement>) => ReactNode;
    size            :   any;
}

export const Modal = ({ title, renderContent, isOpen, onChange, ...props }: Props) => {
    return (
        <MainModal isOpen={isOpen} onOpenChange={onChange} isDismissable={false} {...props}>
            <ModalContent>
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


