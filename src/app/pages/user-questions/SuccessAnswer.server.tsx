import { Button, useDisclosure } from "@nextui-org/react"
import { authService } from "../../../domain/services/auth.service"
import { ArrowUpRight, DownloadIcon, LogoutIcon } from "../../../infraestructure/components/icons";
import { useEffect } from "react";
import { Modal } from "../../../infraestructure/components/ui/Modal";
import { surveyService } from "../../../domain/services/survey.service";
import { guideService } from "../../../domain/services/guide.service";
import { useNavigation } from "../../hooks/useNavigation";

export const SuccessAnswer = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { startLogout } = authService();
  const { startDownloadSurveyUserResume, loading } = surveyService();
  const { guideUser } = guideService();

  const { navigate } = useNavigation();

  useEffect(() => {
    onOpen()
  }, []);

  console.log(guideUser)


  return (
    <div className="flex flex-col items-center justify-center">
      <Modal
        title=""
        isOpen={isOpen}
        onChange={onOpenChange}
        size="3xl"
        renderContent={() => (
          <div>
            <h4 className="text-center bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 text-transparent py-5 bg-clip-text font-bold text-2xl">Antes de terminar</h4>
            <div className="flex flex-col items-center justify-center">
              <span className="w-[4rem] h-[4rem] animate-bounce bg-emerald-600 rounded-full flex items-center justify-center text-white my-3 shadow-2xl">
                <DownloadIcon width={30} height={30} />
              </span>
              <span className="text-gray-900/40 text-xs font-bold block text-center">Por favor haz clic en el boton para poder descargar el resumen de tu cuestionario, una vez finalizado entregalo al area correspondiente.</span>
              <Button className="bg-slate-800 text-white mt-5 py-6 font-bold mb-10"
                onClick={startDownloadSurveyUserResume}
                isLoading={loading}
                endContent={
                  <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                    <DownloadIcon width={18} height={18} />
                  </span>
                }>
                Descargar resumen
              </Button>
            </div>
          </div>
        )}
      />
      <img
        src="/cuestionario/public/assets/completed.svg"
        alt="Completed-icon"
        width={300}
        height={300}
        className="mt-10" />
      <h1 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-3xl md:text-4xl lg:text-6xl font-bold mt-10 mb-5">
        {
          (guideUser && guideUser?.status) ? 'Aun no terminamos' : 'Gracias por tus respuestas'
        }

      </h1>
      <p className="text-gray-500 font-bold text-sm">
        {
         (guideUser && !guideUser?.status) ? 'Haz clic en el botón de la parte inferior para continuar' : 'No es necesario que realices otra encuestas, recuerda que las respuestas son de forma anonima'
        }
      </p>
      <Button className="bg-slate-800 text-white mt-10 w-full lg:w-5/12 xl:w-3/12 py-6 font-bold"
        onClick={() => {(guideUser && !guideUser?.status) ? navigate('/auth/user/questions', { replace: true }) : startLogout() }}
        endContent={
          <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
            {
              (guideUser && !guideUser?.status) ? <ArrowUpRight width={18} height={18} /> : <LogoutIcon width={18} height={18} />
            }
          </span>}>
        {
          (guideUser && !guideUser?.status) ? 'Comenzar siguiente cuestionario' : 'Salir'
        }
      </Button>

      <span className="text-gray-900/40 transition-all duration-500 ease-in hover:text-emerald-600 text-xs font-bold mt-10 cursor-pointer" onClick={onOpen} >
        Descargar mi resumen
      </span>

    </div>
  )
}
