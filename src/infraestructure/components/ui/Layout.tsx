import { Fragment, ReactNode, memo, useState } from 'react';

import { MainDrawer, Navbar } from './';
import { authService } from '../../../domain/services/auth.service';
import { ADMIN_ROLE } from '../../routes/AdminRoutes';
interface Props {
    children: ReactNode
}

export const Layout = memo(({ children }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const { user } = authService();
    const toggleDrawer = () => setIsOpen((prevState) => !prevState);

    return (
        <main className="relative overflow-hidden 
         after:absolute after:w-full after:h-full after:blur-3xl after:top-0 after:-z-[99999]
            before:w-full before:h-full before:fixed before:top-0 before:left-0 before:backdrop-blur-3xl before:bg-white/20 before:-z-50
        ">
            {
                user?.role === ADMIN_ROLE && (
                    <Fragment>
                        <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
                        <Navbar toggleDrawer={toggleDrawer} isOpen={isOpen} />
                    </Fragment>
                )
            }
            <span className="bg-emerald-500 absolute w-10/12 lg:w-6/12 h-[300px] -top-56 -right-40 lg:-right-60 -z-30 rounded-full shadow-lg"></span>
            <span className="bg-emerald-500 absolute w-10/12 lg:w-6/12 h-[300px] -bottom-60 -left-40 lg:-left-60 -z-30 rounded-full shadow-lg rotate-180"></span>
            <section className="min-h-screen px-2 md:px-10 lg:px-40 py-20 lg:py-40 max-w-[2000px] mx-auto">
                {children}
            </section>
        </main>
    )

})
