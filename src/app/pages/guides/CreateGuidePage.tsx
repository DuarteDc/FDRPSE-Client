import { Fragment } from 'react/jsx-runtime';
import { PageLayout } from '../../../infraestructure/components/ui';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { GUIDE_STEPS } from '../../utils/guideSteps';
import { Button, Spinner } from '@nextui-org/react';
import { ArrowNarrowLeft, ArrowNarrowRight, SaveIcon } from '../../../infraestructure/components/icons';

export const CreateGuidePage = () => {
  return (
    <PageLayout title="Crear cuestionario" navigateTo="/auth/surveys">
      <span className="text-gray-500 font-bold text-xs -mt-5 mb-20 pl-4">Crea un nuevo cuestionario, asigna un nombre y agrega las preguntas </span>
      <Steper
        steps={GUIDE_STEPS}
        showProgress={false}
        renderButtons={({ step, backStep, nextStep }) =>
          <Fragment>
            <Button
              onClick={backStep}
              className="border-2 border-transparent hover:border-slate-800  bg-transparent"
              isDisabled={(step < 1)}
              startContent={<ArrowNarrowLeft />}>
              Atras
            </Button>
            <Button
              onClick={nextStep}
              className="float-right bg-slate-800 text-white"
              endContent={(step + 1) >= GUIDE_STEPS.length ? <SaveIcon /> : <ArrowNarrowRight />}
              // isLoading={loading}
              spinner={<Spinner />}
            >
              {(step + 1) >= GUIDE_STEPS.length ? 'Guardar' : 'Sieguiente'}
            </Button>
          </Fragment>
        }
      />
    </PageLayout >
  )
}
