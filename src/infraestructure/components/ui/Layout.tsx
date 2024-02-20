import { Fragment, ReactNode, useState } from 'react';

import { MainDrawer, Navbar } from './';
import { authService } from '../../../domain/services/auth.service';
import { ADMIN_ROLE } from '../../routes/AdminRoutes';
interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {

    const [isOpen, setIsOpen] = useState(true);
    const { user } = authService();
    const toggleDrawer = () => setIsOpen((prevState) => !prevState);

    return (
        <main className="relative overflow-hidden">
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

}
