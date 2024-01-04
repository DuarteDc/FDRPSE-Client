import { useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { questionRepository } from '../../infraestructure/repositories/question.respository';

export const questionService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, questions } = useContext(QuestionContext);


    const startGetQuestions = async (): Promise<void> => {
        setLoading(true);
        const questions = await questionRepository.getQuestions();
        typeof questions !== 'string' && dispatch({ type: 'QUESTION - Load questions', payload: questions });
        setLoading(false);
    }

    return {
        loading,
        questions, 

        startGetQuestions,
    }
}
