import { Link } from 'react-router-dom';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import { routes } from '../../../app/helpers/routes';
interface Props {
    isOpen      : boolean;
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
            <ul className="pt-24 [&>a]:mb-12 [&>a]:cursor-pointer [&>a]:flex [&>a]:items-center [&>a>span]:ml-2 [&>a>span]:-mb-1 [&>a>span]:text-sm text-gray-500 font-bold">
                {
                    routes.map(({ name, icon, path }) => (
                        <Link key={path} to={path} className="flex items-center">
                            { icon({width: 20, height: 20}) }
                            <span>{ name }</span>
                        </Link>
                    ))
                }
            </ul>
        </Drawer>
    )
}
