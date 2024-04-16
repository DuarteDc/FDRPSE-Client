import { Tooltip } from '@nextui-org/react';
import { FormDomain } from '../../../infraestructure/components/domains';
import { PageLayout } from '../../../infraestructure/components/ui';
import { BoxIcon } from '../../../infraestructure/components/icons';


export const CreateDomainPage = () => {
  return (
    <PageLayout title="Crear dominio">
      <div className="lg:grid lg:grid-cols-3 gap-x-10">
        <span className="mb-5 block col-span-3">
          <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
            <BoxIcon width={35} height={35} strokeWidth={1.5} />
            <p className="font-bold">Datos Generales</p>
          </span>
          <p className="text-gray-500 font-bold text-xs pl-10">Asigna los valores con los cuales se va a calificar el dominio</p>
        </span>
        <FormDomain />
        <div className="lg:flex justify-end hidden">
          <div className="mt-40">
            <Tooltip
              showArrow
              content={
                <div className="px-1 py-2 max-w-[20rem] font-bold">
                  Recuerda que puedes crear multiples calificaciones para cada dominio, todo depende de tu contexto donde apliques cada una.
                </div>
              }
              color="foreground"
              delay={1000}>
              <img
                className="drop-shadow-2xl shadow-emerald-600 cursor-pointer"
                src="/cuestionario/public/assets/create-resource.svg"
                // src="/assets/create-resource.svg"
                alt="form-icon"
                width={600}
                height={100}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
