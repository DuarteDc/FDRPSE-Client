import { createRef, useState } from 'react'
import { StepComponent, type ValidateStep } from '../utils/questionSteps';

interface Props {
    stepsComponent: Array<StepComponent>
}

export const useSteps = ({ stepsComponent }: Props) => {

    const [step, setStep] = useState<number>(0);
    const stepRefs = stepsComponent.map(() => createRef<ValidateStep>());

    const { component, name } = stepsComponent[step];

    const nextStep = async () => {
        if(await stepRefs[step].current?.canContinue()) 
            ((stepsComponent.length - 1) <= step) ? undefined : setStep(prev => prev + 1);
    }

    const backStep = () => (step < 1) ? undefined : setStep(prev => prev - 1);

    return {
        step,
        Component: component,
        componentName: name,
        currentRef: stepRefs[step],
        nextStep,
        backStep,
    }


}
