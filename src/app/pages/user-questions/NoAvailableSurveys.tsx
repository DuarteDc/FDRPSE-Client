import { useContext } from 'react';
import { AuthContext } from '../../../infraestructure/context/auth';
import { Button } from '@nextui-org/react';
import { authService } from '../../../domain/services/auth.service';
import { LogoutIcon } from '../../../infraestructure/components/icons';

export const NoAvailableSurveys = () => {
  const { startLogout } = authService();
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full flex justify-center items-center px-5">
      <div className="grid lg:grid-cols-7 py-5 lg:py-20 max-w-[2000px]">
        <div className="flex flex-col justify-center col-span-3">
          <h1 className="text-5xl md:text-7xl font-bold lg:mb-10 mt-10">HOLA <b className="text-emerald-600 capitalize">{`${user?.userName}`}</b></h1>
          <span className="lg:hidden mx-auto my-10">
            <img src="/cuestionario/public/assets/question-home.svg" alt="home-icon" loading="lazy" width="200" height="200" />
          </span>
          <h2 className="text-lg my-5 text-gray-600">Bienvenido al portal <b>Identificación y analisis de los factores de riesgo psicologicos y evaluación del entorno de organizacional en los centros de trabajo.</b></h2>
          <p className="text-xs mb-6 text-gray-600">
            No hay cuestionarios disponibles para responder.
          </p>
          <Button className="bg-slate-800 w-full text-white font-bold text-xs py-7 mt-5 lg:mt-0" size="lg" type="button" onClick={startLogout}>
            Salir
            <LogoutIcon />
          </Button>
        </div>
        <div className="hidden col-span-4 lg:flex justify-end">
          <img src="/cuestionario/public/assets/question-home.svg" alt="home-icon" loading="eager" width="600" height="600" />
        </div>
      </div>
    </div>
  )
}
