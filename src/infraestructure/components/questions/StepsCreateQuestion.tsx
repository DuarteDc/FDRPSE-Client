import { Button, Card, CardBody, Progress } from '@nextui-org/react';
import { ArrowNarrowLeft, ArrowNarrowRight } from '../icons';

import { useSteps } from '../../../app/hooks/useSteps';
import { QUESTION_STEPS } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
import { ComponentWapper } from './ComponentWapper';

export const StepsCreateQuestion = () => {

    const { step, increaseStep, decreaseStep, } = useSteps({ stepsComponent: QUESTION_STEPS });

    return (
        <Card className="py-5 px-4">
            <span className="font-bold font-xl">Pasos {step + 1} / {QUESTION_STEPS.length}</span>
            <Progress value={getProgessByStep(QUESTION_STEPS.length, step)} classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
            <CardBody className="p-5">
                <div> {QUESTION_STEPS[step].name} </div>
                <ComponentWapper>
                    {QUESTION_STEPS[step].component}
                </ComponentWapper>
                <div className="py-10">
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
                </div>
            </CardBody>
        </Card>
    )
}

