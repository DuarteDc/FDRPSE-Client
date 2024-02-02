import { createRef, useCallback, useState } from 'react';

export const useAnswerQuestion = () => {

    const [step, setStep] = useState(1);
    const nextButtonRef = createRef<any>();

    const handlePreviousStep = useCallback(() => setStep(step => step - 1), []);
    const handleNextStep = useCallback(() => setStep(step => step + 1), []);

    const handleChangeOptionValue = (formik: any, value: number, questionId: number) => {
        formik.setFieldValue(`question_id_${questionId}`, value, true);
    }

    return {
        step,

        handleNextStep,
        handlePreviousStep,
        handleChangeOptionValue,
    }


}
