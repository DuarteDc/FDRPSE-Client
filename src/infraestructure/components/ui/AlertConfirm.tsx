import { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from '@nextui-org/react';

interface Props {
    title: string;
    icon?: ReactNode;
    subtitle?: string | ReactNode;
    callback: CallableFunction;
    isOpen: boolean;
    isOpenChange: () => void;
    confirmButtonColor?: 'danger' | 'emerald-600'
}
export const AlertConfirm = ({ title, subtitle, callback, icon, isOpenChange, confirmButtonColor = 'danger', ...props }: Props) => {


    return (
        <Modal
            {...props}
            onChange={isOpenChange}
            size="lg"
            isKeyboardDismissDisabled
            hideCloseButton
            scrollBehavior="inside"
            placement="center"
            renderContent={(onClose) => (
                <div>
                    <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                        <div className="w-full text-center flex justify-center font-bold [&>svg]:text-emerald-600 text-sm [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                            <span>{title}</span>
                        </div>
                    </header>
                    <div>
                        {icon && icon}
                        <span>{subtitle}</span>
                    </div>
                    <footer className="flex border-t-2 pt-2 [&>*]:mx-1 [&>*]:font-bold [&>*]:text-[10px]">
                        <Button
                            onClick={onClose}
                            className="w-full border-2  bg-transparent hover:bg-primary hover:border-primbg-primary transition-all duration-400 hover:text-white">
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => { callback(), onClose() }}
                            className={`w-full border-2 border-${confirmButtonColor} ${confirmButtonColor === 'danger' ? 'hover:bg-danger' : 'hover:border-b-emerald-600'} hover:text-white transition-all duration-400 bg-transparent`}>
                            Confirmar
                        </Button>
                    </footer>
                </div>
            )}

        />
    )
}
