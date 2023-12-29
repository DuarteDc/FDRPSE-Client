import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'

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
            className="px-2 bg-red-600"
            // style={{ backgroundColor: `${theme === 'dark' ? 'black' : 'white'}` }}
            zIndex={20}
        >
            <p className="pt-20">Hola</p>
        </Drawer>
    )
}
