import { Fragment, useEffect } from 'react';

import { useQuestion } from '../../hooks/useQuestion';
import { PageLayout } from '../../../infraestructure/components/ui';
import { Steper } from '../../../infraestructure/components/ui/Steper';

import { QUESTION_STEPS } from '../../utils/questionSteps';
import { Button } from '@nextui-org/react';
import { ArrowNarrowLeft, ArrowNarrowRight } from '../../../infraestructure/components/icons';


export const CreateQuestionPage = () => {

    const { startGetCategoriesDomainAndDimenstions } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <Steper
                steps={QUESTION_STEPS}
                renderButtons={({ increaseStep, decreaseStep, step }) =>
                    <Fragment>
                        <Button
                            onClick={decreaseStep}
                            className="bg-slate-800 text-white"
                            isDisabled={(step < 1)}
                            startContent={<ArrowNarrowLeft />}>
                            Atras
                        </Button>
                        <Button
                            onClick={increaseStep}
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


