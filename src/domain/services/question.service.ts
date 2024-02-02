import { useCallback, useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { questionRepository } from '../../infraestructure/repositories/question.respository';
import type { CreateQuestionDto, SaveUserQuestionDto } from '../../infraestructure/http/dto/questions';
import { useNavigate } from 'react-router-dom';
import { QuestionsField } from '../../app/helpers/createFieldsQuestionValidations';

export const questionService = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch, questions, question, sectionQuestions, totalQuestions, currentPage } = useContext(QuestionContext);

    const toggleLoading = useCallback(() => setLoading(prev => !prev), []);

    const startGetQuestions = async (): Promise<void> => {
        toggleLoading()
        const questions = await questionRepository.getQuestions();
        typeof questions !== 'string' && dispatch({ type: 'QUESTION - Load questions', payload: questions });
        toggleLoading()
    }

    const startCreateQuestion = async (createQuestionDto: CreateQuestionDto) => {
        toggleLoading();
        const { success } = await questionRepository.createQuestion(createQuestionDto);
        if (success) return navigate(-1);
        toggleLoading();
    }

    const startShowQuestion = async (questionId: string) => {
        toggleLoading();
        const question = await questionRepository.getQuestionById(questionId);
        typeof question !== 'string' && dispatch({ type: 'QUESTION - Load question', payload: question });
        toggleLoading();
    }


    const startGetQuestionsBySection = async (page = 1) => {
        const sectionQuestions = await questionRepository.getQuestionBySection(page);
        typeof sectionQuestions !== 'string' && dispatch({ type: 'QUESTION - Get Question to user', payload: sectionQuestions });
    }

    const clearQuestionBySection = () => dispatch({ type: 'QUESTION - Clear Question Cache' });

    const createBodyRequest = (formQuestionData: QuestionsField): SaveUserQuestionDto => {
        const body = Object.entries(formQuestionData).map(([key, value]) => {
            const question_id = key.split("_").pop();
            return { question_id: question_id!, qualification: +value }
        });

        return { questions: body }
    }

    const saveQuestionUser = async (questions: QuestionsField) => {
        const formQuestionData = createBodyRequest(questions!);
        const { success } = await questionRepository.saveUserAnswers(formQuestionData);
        return success;
    }


    return {
        loading,
        questions,
        question,
        sectionQuestions,
        totalQuestions,
        currentPage,
        startGetQuestions,
        startCreateQuestion,
        startShowQuestion,
        clearQuestionBySection,
        saveQuestionUser,
        startGetQuestionsBySection
    }
}
