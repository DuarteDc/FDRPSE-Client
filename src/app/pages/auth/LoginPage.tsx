import { useEffect } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import { LoginForm } from '../../../infraestructure/components/auth';
import { Modal } from '../../../infraestructure/components/ui/Modal';

export const LoginPage = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const acceptPolicy = () => {
    localStorage.setItem('policy', JSON.stringify(true));
  }

  const handleShowPolicy = () => {
    try {
      const showPolicy = JSON.parse(localStorage.getItem('policy') || "false")
      if (!showPolicy || typeof showPolicy !== 'boolean') onOpen();
    } catch (error) {
      onOpen();
    }
  }

  useEffect(() => {
    handleShowPolicy();
    // window.addEventListener('beforeunload', () => {
    //   localStorage.removeItem('policy');
    // });
  }, []);

  return (
    <main className="relative overflow-hidden flex flex-col justify-center items-center">
      <section className="w-full px-5 xl:px-28 max-w-[2000px] flex flex-col justify-center items-center min-h-screen">
        <span className="bg-emerald-500 absolute w-full lg:w-6/12 h-[150px] lg:h-[300px] -top-28 lg:-top-56 -right-20 lg:-right-60 -z-30 rounded-full shadow-lg"></span>
        <span className="bg-emerald-500 absolute w-full lg:w-6/12 h-[150px] lg:h-[300px]  -bottom-28 lg:-bottom-60 -left-20 lg:-left-60 -z-30 rounded-full shadow-lg rotate-180"></span>
        <h1 className="lg:px-28 mt-28 text-base md:text-base lg:text-3xl text-center bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent bg-clip-text font-bold">Portal de Identificación y Análisis de los Factores de Riesgo Psicológicos y Evaluación del Entorno Organizacional en los Centros de Trabajo de IGECEM</h1>
        <div className="grid grid-cols-1 lg:grid-cols-7 w-full my-20">
          <div className="flex items-center justify-center col-span-4">
            <img
              //src="/cuestionario/public/assets/signin.svg"
              src="/assets/signin.svg"
              width={80}
              height={80}
              alt="Icon-login"
              className="w-[8rem] h-[8rem] md:w-[20rem] md:h-[20rem] xl:w-[35rem] lg:h-[35rem]"
            />
          </div>
          <LoginForm />
        </div>

        <Modal
          isOpen={isOpen}
          onChange={onOpenChange}
          hideCloseButton
          isKeyboardDismissDisabled={false}
          placement="bottom"
          scrollBehavior="inside"
          size="full"
          backdrop="blur"
          className="-bottom-0 w-full h-[22rem] md:h-[19rem] lg:h-[17rem]"
          renderContent={(onClose) => (
            <section className="px-5">
              <div className="w-full text-emerald-600 text-2xl lg:text-3xl font-bold mb-4">
                <h2>Aviso de privacidad</h2>
              </div>
              <div className="*:my-2 text-xs md:text-sm">
                <p>Los datos personales recabados serán protegidos, incorporados y tratados los términos
                  de los Artículo 21 de la Ley Federal de Protección de Datos Personales, a si mismo, se les
                  informa que sus datos no podrán ser difundidos sin su consentimiento expreso, salvo las
                  excepciones contenidas en la Ley.
                </p>
                <p>
                  El responsable de los datos personales es la o el titular de la Subdirección de
                  Administración de Personal del Instituto de <b>Información e Investigación Geográfica,
                    Estadística y Catastral del Estado de México.</b>
                </p>
              </div>
              <div className="flex justify-end lg:mt-10">
                <Button className="bg-emerald-600 text-white font-bold w-full lg:w-2/12 rounded-lg" size="lg" onClick={() => {
                  onClose();
                  acceptPolicy();
                }}>
                  Aceptar
                </Button>
              </div>
            </section>
          )}
        />
      </section>
    </main>
  )
}

