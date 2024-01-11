import { useRef, useState } from 'react'
import { StepComponent } from '../utils/questionSteps';

interface Props {
    stepsComponent: Array<StepComponent>
}
interface ImplementsCanContinue {
    canContinue: () => boolean;
}

export const useSteps = ({ stepsComponent }: Props) => {

    const [step, setStep] = useState<number>(0);
    const stepRefs = stepsComponent.map(() => useRef());

    const { component, name } = stepsComponent[step];

    const increaseStep = () => {
        const currentStepRef = stepRefs[step].current;
        if(currentStepRef!.canContinue() || false) {
            ((stepsComponent.length - 1) <= step) ? undefined : setStep(prev => prev + 1);
        }else{
            console.log("Error");
        }
    }


    const decreaseStep = () => (step < 1) ? undefined : setStep(prev => prev - 1);

    const canContinue = (callback: Function, params: any): Promise<void> => {
        return new Promise((resolve) => {
            resolve(callback(params));
        })
            .then(() => increaseStep())
            .catch((error) => console.log(error));
    }

    return {
        step,
        Component: component,
        componentName: name,
        currentRef: stepRefs[step],
        increaseStep,
        decreaseStep,
        canContinue,
    }


}
