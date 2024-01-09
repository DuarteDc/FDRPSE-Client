import { ModalContent, ModalHeader, Modal as MainModal } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
    className: string;
    isOpen: boolean;
    title: string;
    onChange: () => void;
    renderContent: (onClose: Function) => ReactNode;
    onClose: () => void;
}

export const Modal = ({ isOpen, onChange, title, renderContent }: Props) => {
    return (
        <MainModal isOpen={isOpen} onOpenChange={onChange} isDismissable={false}>
            <>
                <ModalHeader>{title}</ModalHeader>
                {(onClose: Function) => (
                    <ModalContent>
                        {renderContent(onClose)}
                    </ModalContent>
                )}
            </>
        </MainModal >
    )
}


