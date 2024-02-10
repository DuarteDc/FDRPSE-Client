import { Fragment, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { ArrowNarrowLeft, ArrowNarrowRight, SaveIcon } from '../../../infraestructure/components/icons';

import { useQuestion } from '../../hooks/useQuestion';
import { QUESTION_STEPS } from '../../utils/questionSteps';
import { questionService } from '../../../domain/services/question.service';

export const CreateQuestionPage = () => {

    const { startGetCategoriesDomainAndDimenstions } = useQuestion();
    const { loading } = questionService();

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
                            className="border-2 border-transparent hover:border-slate-800  bg-transparent"
                            isDisabled={(step < 1)}
                            startContent={<ArrowNarrowLeft />}>
                            Atras
                        </Button>
                        <Button
                            onClick={nextStep}
                            className="float-right bg-slate-800 text-white"
                            endContent={(step + 1) >= QUESTION_STEPS.length ? <SaveIcon /> : <ArrowNarrowRight />}
                            isLoading={loading}
                            spinner={<Spinner />}
                        >
                            {(step + 1) >= QUESTION_STEPS.length ? 'Guardar' : 'Sieguiente'}
                        </Button>
                    </Fragment>

                }
            />
        </PageLayout>
    )
}


