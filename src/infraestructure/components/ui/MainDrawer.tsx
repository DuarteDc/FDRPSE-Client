import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import { BoxIcon, CategoryIcon, FileDescription, HomeIcon, QuestionIcon } from '../icons';

interface Props {
    isOpen: boolean;
    toggleDrawer: () => void;
}

export const MainDrawer = ({ isOpen, toggleDrawer }: Props) => {

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="left"
            size={350}
            className="px-4 bg-red-600"
            // style={{ backgroundColor: `${theme === 'dark' ? 'black' : 'white'}` }}
            zIndex={20}
        >
            <ul className="pt-24 [&>li]:mb-12 [&>li]:cursor-pointer [&>li]:flex [&>li]:items-center [&>li>span]:ml-2 [&>li>span]:-mb-1 [&>li>span]:text-sm text-gray-500 font-bold">
                <li>
                    <HomeIcon />
                    <span>Inicio</span>
                </li>
                <li>
                    <FileDescription />
                    <span>Cuestionarios</span>
                </li>
                <li>
                    <QuestionIcon />
                    <span>Preguntas</span>
                </li>
                <li>
                    <CategoryIcon />
                    <span>Categorías</span>
                </li>
                <li>
                    <BoxIcon />
                    <span>Dominios</span>
                </li>

            </ul>
        </Drawer>
    )
}
