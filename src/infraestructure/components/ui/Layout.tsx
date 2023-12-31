import { ReactNode, useState } from 'react';

import { MainDrawer, Navbar } from './';
interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggleDrawer = () => setIsOpen((prevState) => !prevState)

    return (
        <main className="relative overflow-hidden">
            <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}/>
            <Navbar toggleDrawer={toggleDrawer} isOpen={isOpen} />
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -top-56 -right-60 -z-30 rounded-full shadow-lg"></span>
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -bottom-60 -left-60 -z-30 rounded-full shadow-lg rotate-180"></span>
            <section className="min-h-screen px-2 md:px-10 lg:px-40 py-20 lg:py-40 max-w-[2000px] mx-auto">
                {children}
            </section>
        </main>
    )
    
}
