import { ReactNode } from 'react';
import { Card, CardBody, Progress } from '@nextui-org/react';
import { useSteps } from '../../../app/hooks/useSteps';

import { StepComponent } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
interface RenderButtonsProps {
    step: number;
    increaseStep: () => void;
    decreaseStep: () => void;
}

interface Props {
    steps: Array<StepComponent>;
    renderButtons: ({ increaseStep, decreaseStep, step }: RenderButtonsProps) => ReactNode | Array<ReactNode>;
}

export const Steper = ({ steps, renderButtons }: Props) => {

    const { step, increaseStep, decreaseStep, Component, componentName, currentRef } = useSteps({ stepsComponent: steps });

    return (
        <Card className="p-5">
            <Progress value={getProgessByStep(steps.length, step)} aria-label="progeso" classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
            <span className="py-5 px-4 font-bold text-xl"> {componentName} </span>
            <CardBody>
                <Component ref={currentRef} />
                <div className="py-10">
                    {renderButtons({ increaseStep, decreaseStep, step })}
                </div>
            </CardBody>
        </Card>
    )
}