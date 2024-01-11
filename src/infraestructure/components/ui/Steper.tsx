import { Card, CardBody, Progress } from '@nextui-org/react';
import { StepComponent } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
import { useSteps } from '../../../app/hooks/useSteps';
import { ComponentWapper } from '../questions';
import { ReactNode } from 'react';

interface RenderButtonsProps {
    increaseStep: () => void;
    decreaseStep: () => void;
    step: number;
}

interface Props {
    steps: Array<StepComponent>;
    renderButtons: ({ increaseStep, decreaseStep, step }: RenderButtonsProps) => ReactNode | Array<ReactNode>;
}

export const Steper = ({ steps, renderButtons }: Props) => {

    const { step, increaseStep, decreaseStep, component, componentName } = useSteps({ stepsComponent: steps });

    return (
        <Card className="p-5">
            <Progress value={getProgessByStep(steps.length, step)} classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
            <div> {componentName} </div>
            <CardBody>
                <ComponentWapper>
                    {component}
                </ComponentWapper>
                <div className="py-10">
                    {renderButtons({ increaseStep, decreaseStep, step })}
                </div>
            </CardBody>
        </Card>
    )
}
