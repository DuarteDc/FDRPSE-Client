import { Link } from 'react-router-dom';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import { routes } from '../../../app/helpers/routes';
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
            className="px-4"
            zIndex={20}
        >
            <ul className="pt-24 [&>a]:py-3 [&>a]:cursor-pointer [&>a]:flex [&>a]:items-center [&>a>span]:ml-2 [&>a>span]:-mb-1 [&>a>span]:text-sm text-gray-500 font-bold transition-all duration-400">
                {
                    routes.map(({ name, icon, path }) => (
                        <Link key={path} to={path} className="flex items-center hover:shadow-2xl hover:bg-emerald-600 pl-4 hover:transition-all hover:duration-300 hover:ease-in-out rounded-2xl 
                        hover:text-white [&>svg]:hover:text-emerald-600 [&>svg]:p-3 [&>svg]:bg-emerald-600/60 [&>svg]:rounded-lg [&>svg]:hover:bg-white [&>svg]:text-white">
                            {icon({ width: 45, height: 45 })}
                            <span>{name}</span>
                        </Link>
                    ))
                }
            </ul>
        </Drawer>
    )
}
