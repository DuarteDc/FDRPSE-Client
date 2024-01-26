import { useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { questionRepository } from '../../infraestructure/repositories/question.respository';
import { CreateQuestionDto } from '../../infraestructure/http/dto/questions';

export const questionService = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, questions } = useContext(QuestionContext);

    const startGetQuestions = async (): Promise<void> => {
        setLoading(true);
        const questions = await questionRepository.getQuestions();
        typeof questions !== 'string' && dispatch({ type: 'QUESTION - Load questions', payload: questions });
        setLoading(false);
    }

    const startCreateQuestion = async (createQuestionDto: CreateQuestionDto) => {
        setLoading(prev => !prev);
        const { message, success } = await questionRepository.createQuestion(createQuestionDto);
        return success && alert(success);
    }

    return {
        loading,
        questions,
        startGetQuestions,
        startCreateQuestion,
    }
}
