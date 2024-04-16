import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import { routes, type Routes } from '../../../app/helpers/routes';
import { NavigateFunction, useNavigation } from '../../../app/hooks/useNavigation';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { getCurrentPath } from '../../../app/helpers/getCurrentPath';
interface Props {
    isOpen: boolean;
    toggleDrawer: () => void;
}

export const MainDrawer = ({ isOpen, toggleDrawer }: Props) => {

    const { navigate } = useNavigation();

    const { pathname } = useLocation();

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="left"
            size={350}
            className="px-2"
            zIndex={20}
        >
            <div className="mt-20">
                <RouteList
                    pathname={pathname}
                    routes={routes}
                    toggleDrawer={toggleDrawer}
                    navigate={navigate}
                />
            </div>
        </Drawer>
    )
}

interface PropsRouteItem {
    routes: Array<Routes>;
    navigate: NavigateFunction
    pathname: string;
    toggleDrawer: () => void;
}


const RouteList = memo(({ routes, navigate, toggleDrawer, pathname }: PropsRouteItem) => {
    return (
        <Accordion
            className="flex flex-col gap-1 w-full -mr-10"
            showDivider={false}
            variant="light"
            fullWidth
            itemClasses={{
                base: ` py-0 w-full py-1`,
                trigger: "font-bold text-sm px-2 py-8 data-[hover=true]:bg-emerald-600 data-[hover=true]:text-white transition-all duration-600 rounded-lg h-14 flex items-center text-gray-500",
            }}
        >
            {
                routes.map(({ name, path, icon, ...rest }) => (
                    <AccordionItem
                        key={path}
                        motionProps={{
                            variants: {
                                enter: {
                                    y: 0,
                                    opacity: 1,
                                    height: rest?.subroutes ? "auto" : 0,
                                },
                                exit: {
                                    y: -10,
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                        height: {
                                            easings: "ease",
                                            duration: 0.25,
                                        },
                                        opacity: {
                                            easings: "ease",
                                            duration: 0.3,
                                        },
                                    },
                                },
                            },
                        }}
                        classNames={{
                            trigger: `${getCurrentPath(pathname, path)} rounded-lg px-4 transistion-all duration-600`,
                        }}
                        textValue={name}
                        startContent=
                        {
                            <li key={path} className={`flex w-full items-center rounded-2xl  [&>svg]:p-3 [&>svg]:bg-emerald-600/60 [&>svg]:rounded-lg  [&>svg]:text-white [&>svg]:mr-2
                            `}>
                                {icon({ width: 45, height: 45, strokeWidth: 2.5 })}
                                <span>{name}</span>
                            </li>
                        }
                        hideIndicator={!rest?.subroutes}
                        onPress={() => { !rest?.subroutes && (navigate(path), toggleDrawer()) }}
                    >
                        {
                            rest.subroutes && (
                                <RouteList
                                    routes={[...rest.subroutes, { name, path, icon, }]}
                                    navigate={navigate}
                                    toggleDrawer={toggleDrawer}
                                    pathname={pathname}
                                />
                            )
                        }
                    </AccordionItem>
                ))
            }
        </Accordion >
    )
})

{/* <li key={path} onClick={() => { navigate(path); toggleDrawer() }} className="flex items-center hover:shadow-2xl hover:bg-emerald-600 pl-4 hover:transition-all hover:duration-300 hover:ease-in-out rounded-2xl hover:text-white [&>svg]:hover:text-emerald-600 [&>svg]:p-3 [&>svg]:bg-emerald-600/60 [&>svg]:rounded-lg [&>svg]:hover:bg-white [&>svg]:text-white">
            {icon({ width: 45, height: 45, strokeWidth: 2.5 })}
            <span>{name}</span>
        </li> */}