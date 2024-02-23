import { Button, useDisclosure } from "@nextui-org/react"
import { authService } from "../../../domain/services/auth.service"
import { DownloadIcon, LogoutIcon } from "../../../infraestructure/components/icons";
import { useEffect } from "react";
import { Modal } from "../../../infraestructure/components/ui/Modal";

export const SuccessAnswer = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { startLogout } = authService();

  useEffect(() => {
    onOpen()
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Modal
        title=""
        isOpen={isOpen}
        onChange={onOpenChange}
        size="3xl"
        renderContent={(onClose) => (
          <div>
            <h4 className="text-center bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 text-transparent py-5 bg-clip-text font-bold text-2xl">Antes de terminar</h4>
            <div className="flex flex-col items-center justify-center">
              <span className="w-[4rem] h-[4rem] animate-bounce bg-emerald-600 rounded-full flex items-center justify-center text-white my-3 shadow-2xl">
                <DownloadIcon width={30} height={30} />
              </span>
              <span className="text-gray-900/40 text-xs font-bold block text-center">Por favor haz clic en el boton para poder descargar el resumen de tu cuestionario, una vez finalizado entregalo al area correspondiente.</span>
              <Button className="bg-slate-800 text-white mt-5 py-6 font-bold mb-10" endContent={
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
      <img src="/cuestionario/public/assets/completed.svg" alt="Completed-icon" width={300} height={300} className="mt-20" />
      <h1 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-3xl md:text-4xl lg:text-6xl font-bold mt-10 mb-5">Gracias por tus respuestas</h1>
      <p className="text-gray-500 font-bold text-sm">No es necesario que realices otra encuestas, recuerda que las respuestas son de forma anonima</p>
      <Button className="bg-slate-800 text-white mt-10 w-full lg:w-2/12 py-6 font-bold" onClick={startLogout} endContent={<LogoutIcon />}>
        Salir
      </Button>
    </div>
  )
}
