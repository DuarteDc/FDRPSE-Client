import { ModalContent, ModalFooter, ModalHeader, Modal as MainModal } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
    children    : ReactNode | Array<ReactNode>
    className   : string;
    isOpen      : boolean;
    onChange    : () => void;
}

export const Modal = ({ ...props, children, isOpen, onChange }: Props) => {
    return (
        <MainModal isOpen={isOpen} onOpenChange={onChange} isDismissable={false}>
            <>
            {(onClose) => (
                    { children }
            )}
            </>
        </MainModal >
    )
}

const Header = () => <ModalHeader {...props, children}>{children}</ModalHeader>

const Body = () => <ModalContent {...props}>{children} </ModalContent>

const Footer = ({ ...props, children }) => <ModalFooter>{children}</ModalFooter>

Modal.Header    = Header;
Modal.Body      = Body;
Modal.Footer    = Footer;

export default Modal;
