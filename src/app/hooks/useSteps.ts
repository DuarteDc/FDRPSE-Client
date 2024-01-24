import { useRef, useState } from 'react'
import { StepComponent } from '../utils/questionSteps';

interface Props {
    stepsComponent: Array<StepComponent>
}
interface ImplementsCanContinue {
    canContinue:() => boolean;
}

export const useSteps = ({ stepsComponent }: Props) => {

    const [step, setStep] = useState<number>(0);
    const stepRefs = stepsComponent.map(() => useRef<ImplementsCanContinue>());

    const { component, name } = stepsComponent[step];

    const nextStep = () => {
        const currentStepRef = stepRefs[step].current;
        if(currentStepRef?.canContinue()) {
            ((stepsComponent.length - 1) <= step) ? undefined : setStep(prev => prev + 1);
        }else{
            console.log("Error");
        }
    }


    const backStep = () => (step < 1) ? undefined : setStep(prev => prev - 1);

    const canContinue = (callback: Function, params: any): Promise<void> => {
        return new Promise((resolve) => {
            resolve(callback(params));
        })
            .then(() => nextStep())
            .catch((error) => console.log(error));
    }

    return {
        step,
        Component: component,
        componentName: name,
        currentRef: stepRefs[step],
        nextStep,
        backStep,
        canContinue,
    }


}
