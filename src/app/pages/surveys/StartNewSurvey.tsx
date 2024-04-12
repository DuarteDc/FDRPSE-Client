import { Fragment, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { Steper } from '../../../infraestructure/components/ui/Steper';
import { SURVEY_STEPS } from '../../utils/surveySteps';
import { ArrowNarrowLeft, ArrowNarrowRight, PlayerPlay } from '../../../infraestructure/components/icons';
import { guideService } from '../../../domain/services/guide.service';


export const StartNewSurvey = () => {
    const { clearSelectedGuide } = guideService();
    useEffect(() => {
        return () => {
            clearSelectedGuide();
        }
    }, []);
    return (
        <PageLayout title="Comenzar encuesta">
            <Steper
                steps={SURVEY_STEPS}
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
                            endContent={(step + 1) >= SURVEY_STEPS.length ? <PlayerPlay width={20} height={20} /> : <ArrowNarrowRight />}
                            spinner={<Spinner />}
                        >
                            {(step + 1) >= SURVEY_STEPS.length ? 'Comenzar' : 'Sieguiente'}
                        </Button>
                    </Fragment>
                }
            />
        </PageLayout >
    )
}
