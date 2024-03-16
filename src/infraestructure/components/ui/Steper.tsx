import { ReactNode } from 'react';
import { Card, CardBody, Progress } from '@nextui-org/react';
import { useSteps } from '../../../app/hooks/useSteps';

import { StepComponent } from '../../../app/utils/questionSteps';
import { getProgessByStep } from '../../../app/helpers/getProgessByStep';
import { getSizeByStep } from '../../../app/helpers/getSizeByStep';
interface RenderButtonsProps {
    step: number;
    nextStep: () => void;
    backStep: () => void;
    isValidStep: boolean;
}

interface Props {
    steps: Array<StepComponent>;
    renderButtons: ({ nextStep, backStep, step, isValidStep }: RenderButtonsProps) => ReactNode | Array<ReactNode>;
    showProgress?: boolean
}

export const Steper = ({ steps, renderButtons, showProgress = true }: Props) => {

    const { step, nextStep, backStep, Component, currentRef, isValidStep } = useSteps({ stepsComponent: steps });

    return (
        <Card className="p-5 border-2 shadow-none">
            {
                showProgress && (
                    <div className="w-full flex py-6">
                        {
                            steps.map(({ name, icon }, index) => (
                                <div key={name} style={{ width: `${getSizeByStep(steps.length)}` }} className="flex flex-col items-center">
                                    <span className={`transition-all ease-in-out duration-500 rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${(index) <= step ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}>
                                        {icon ? icon({ width: 20, height: 20 }) : <p>{index + 1}</p>}
                                    </span>
                                    <p className="text-gray-500 font-semibold text-[11px] md:text-sm text-center">{name}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                showProgress && (
                    <Progress value={getProgessByStep(steps.length, step)} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary to-emerald-500", }} />
                )
            }
            <CardBody>
                <Component ref={currentRef} nextStep={nextStep} backStep={backStep} step={step}/>
                <div className="py-10">
                    {renderButtons({ nextStep, backStep, step, isValidStep })}
                </div>
            </CardBody>
        </Card>
    )
}