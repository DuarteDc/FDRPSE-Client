import { Button } from '@nextui-org/react';
import { ArrowUpRight } from '../../../infraestructure/components/icons';

export const HomePage = () => {
    return (
        <section className="min-h-screen flex items-center flex-col justify-center px-20 relative overflow-hidden">
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -top-60 -left-60 -z-30 rounded-full shadow-lg"></span>
            <span className="bg-emerald-500 absolute w-6/12 h-[300px] -bottom-60 -right-60 -z-30 rounded-full shadow-lg rotate-180"></span>
            <div className="grid grid-cols-7">
                <div className="flex flex-col justify-center col-span-3">
                    <h1 className="text-7xl font-bold mb-10">Hola <b className="text-emerald-600">Eduardo Duarte</b></h1>
                    <h2 className="text-lg my-5 text-gray-600">Bienvenido al portal <b>Identificación y analisis de los factores de riesgo psicologicos y evaluación del entorno de organizacional en los centros de trabajo.</b></h2>
                    <p className="text-xs mb-6 text-gray-600">
                        A continuación se mostraran una serie de preguntas que deberas responder.
                    </p>
                    <Button className="bg-emerald-500 w-full text-white font-bold text-xs py-7" size="lg">
                        Comenzar
                        <ArrowUpRight />
                    </Button>
                </div>
                <div className="col-span-4 flex justify-center">
                    <img src="/assets/question-home.svg" alt="" />
                </div>
            </div>
        </section>
    )
}
