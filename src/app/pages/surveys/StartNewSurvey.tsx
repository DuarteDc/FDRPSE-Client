import { Fragment, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';

import { areaService } from '../../../domain/services/area.service';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { SURVEY_STEPS } from '../../utils/surveySteps';
import { ArrowNarrowLeft, ArrowNarrowRight, SaveIcon } from '../../../infraestructure/components/icons';


export const StartNewSurvey = () => {


    const { startLoadAreas } = areaService();

    useEffect(() => {
        startLoadAreas();
    }, []);

    return (
        <PageLayout navigateTo="/admin" title="Comenzar encuesta">
            <Steper
                steps={SURVEY_STEPS}
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
                            endContent={(step + 1) >= SURVEY_STEPS.length ? <SaveIcon /> : <ArrowNarrowRight />}
                            spinner={<Spinner />}
                        >
                            {(step + 1) >= SURVEY_STEPS.length ? 'Guardar' : 'Sieguiente'}
                        </Button>
                    </Fragment>
                }
            />
        </PageLayout >
    )
}
