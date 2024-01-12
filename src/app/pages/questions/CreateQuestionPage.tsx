import { Fragment, useEffect } from 'react';
import { Button } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { ArrowNarrowLeft, ArrowNarrowRight } from '../../../infraestructure/components/icons';

import { useQuestion } from '../../hooks/useQuestion';
import { QUESTION_STEPS } from '../../utils/questionSteps';

export const CreateQuestionPage = () => {

    const { startGetCategoriesDomainAndDimenstions } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);
    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <Steper
                steps={QUESTION_STEPS}
                renderButtons={({ step, backStep, nextStep }) =>
                    <Fragment>
                        <Button
                            onClick={backStep}
                            className="bg-slate-800 text-white"
                            isDisabled={(step < 1)}
                            startContent={<ArrowNarrowLeft />}>
                            Atras
                        </Button>
                        <Button
                            onClick={nextStep}
                            color="primary"
                            className="float-right"
                            endContent={<ArrowNarrowRight />}>
                            Siguiente
                        </Button>
                    </Fragment>

                }
            />
        </PageLayout>
    )
}


