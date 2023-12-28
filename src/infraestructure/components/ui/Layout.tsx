import { ReactNode } from 'react';

import { Navbar } from './';
import { Button, Progress } from '@nextui-org/react';
import { ChevonLeft } from '../icons';

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {
    return (
        <main className="relative overflow-hidden">
            <Navbar />
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -top-56 -right-60 -z-30 rounded-full shadow-lg"></span>
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -bottom-60 -left-60 -z-30 rounded-full shadow-lg rotate-180"></span>
            <section className="min-h-screen px-40 pt-40">
                {children}
            </section>
            {/* <footer className="absolute bottom-0 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
                <Progress color="success" aria-label="Loading..." value={9} size="sm" />
                <div className="flex justify-between py-2 px-96">
                    <Button className="hover:border-slate-800 hover:border-2 border-2 border-transparent" variant="bordered" startContent={
                        <ChevonLeft />
                    }>
                        Regresar
                    </Button>
                    <Button color="primary">
                        Siguiente
                    </Button>
                </div>
            </footer> */}
        </main>
    )
}
