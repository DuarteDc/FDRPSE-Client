import { useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { Question } from '../../domain/models';


export const useQuestion = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, question } = useContext(QuestionContext);


    const preSaveQuestion = async (newQuestion: string) => {
        setLoading(true);
        await dispatch({ type: 'QUESTION - Presave question', payload: new Question(crypto.randomUUID(), newQuestion, new Date().toDateString(), new Date().toDateString()) });
        setTimeout(() => setLoading(false), 2000)
    }
    console.log(question)

    return {
        loading,
        question,
        preSaveQuestion
    }
}
