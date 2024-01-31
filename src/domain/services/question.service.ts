import { useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { questionRepository } from '../../infraestructure/repositories/question.respository';
import { CreateQuestionDto } from '../../infraestructure/http/dto/questions';
import { useNavigate } from 'react-router-dom';

export const questionService = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch, questions, question } = useContext(QuestionContext);

    const startGetQuestions = async (): Promise<void> => {
        setLoading(true);
        const questions = await questionRepository.getQuestions();
        typeof questions !== 'string' && dispatch({ type: 'QUESTION - Load questions', payload: questions });
        setLoading(false);
    }

    const startCreateQuestion = async (createQuestionDto: CreateQuestionDto) => {
        setLoading(prev => !prev);
        const { success } = await questionRepository.createQuestion(createQuestionDto);
        if (success) return navigate(-1);
        setLoading(prev => !prev);
    }

    const startShowQuestion = async (questionId: string) => {
        setLoading(prev => !prev);
        const question = await questionRepository.getQuestionById(questionId);
        console.log(question)
        typeof question !== 'string' && dispatch({ type: 'QUESTION - Load question', payload: question });
    }

    return {
        loading,
        questions,
        question,
        startGetQuestions,
        startCreateQuestion,
        startShowQuestion,
    }
}
