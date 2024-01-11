import { useState } from 'react'
import { StepComponent } from '../utils/questionSteps';

interface Props {
    stepsComponent: Array<StepComponent>
}

export const useSteps = ({ stepsComponent }: Props) => {

    const [step, setStep] = useState<number>(0);

    const { component, name } = stepsComponent[step];

    const increaseStep = () => ((stepsComponent.length - 1) <= step) ? undefined : setStep(prev => prev + 1);
    const decreaseStep = () => (step < 1) ? undefined : setStep(prev => prev - 1);

    return {
        step,
        increaseStep,
        decreaseStep,
        component,
        componentName: name
    }


}
