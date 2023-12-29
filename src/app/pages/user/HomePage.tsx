import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';

import { ArrowUpRight } from '../../../infraestructure/components/icons';

export const HomePage = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-7 py-20 max-w-[2000px]">
                <div className="flex flex-col justify-center col-span-3">
                    <h1 className="text-7xl font-bold mb-10">Hola <b className="text-emerald-600">Eduardo Duarte</b></h1>
                    <h2 className="text-lg my-5 text-gray-600">Bienvenido al portal <b>Identificación y analisis de los factores de riesgo psicologicos y evaluación del entorno de organizacional en los centros de trabajo.</b></h2>
                    <p className="text-xs mb-6 text-gray-600">
                        A continuación se mostraran una serie de preguntas que deberas responder.
                    </p>
                    <Button className="bg-slate-800 w-full text-white font-bold text-xs py-7" size="lg" type="button" as={Link} to="/auth/admin">
                        Iniciar ahora
                        <ArrowUpRight />
                    </Button>
                </div>
                <div className="col-span-4 flex justify-end">
                    <img src="/assets/question-home.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
