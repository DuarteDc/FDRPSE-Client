import { Button, Card, CardBody, Progress } from '@nextui-org/react';
import { ArrowNarrowLeft, ArrowNarrowRight } from '../icons';

import { useSteps } from '../../../app/hooks/useSteps';
import { QUESTION_STEPS } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
import { ComponentWapper } from './ComponentWapper';

export const StepsCreateQuestion = () => {

    const { step, nextStep, backStep, Component, componentName } = useSteps({ stepsComponent: QUESTION_STEPS });

    return (
        <Card className="py-5 px-4">
            <span className="font-bold font-xl">Pasos {step + 1} / {QUESTION_STEPS.length}</span>
            <Progress value={getProgessByStep(QUESTION_STEPS.length, step)} classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
            <CardBody className="p-5">
                <div> {componentName} </div>
                <ComponentWapper>
                    {Component}
                </ComponentWapper>
                <div className="py-10">
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
                </div>
            </CardBody>
        </Card>
    )
}

