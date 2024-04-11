import { useCallback, useContext, useState } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { questionRepository } from '../../infraestructure/repositories/question.respository';
import type { CreateQuestionDto, SaveUserQuestionDto } from '../../infraestructure/http/dto/questions';
import { QuestionsField } from '../../app/helpers/createFieldsQuestionValidations';
import { useNavigation } from '../../app/hooks/useNavigation';

export const questionService = () => {

    const { dispatch, questions, question, sectionQuestions, totalQuestions, currentPage } = useContext(QuestionContext);

    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigation();

    const toggleLoading = useCallback(() => setLoading(prev => !prev), []);

    const startGetQuestions = async (query: string): Promise<void> => {
        toggleLoading()
        const questions = await questionRepository.getQuestions(query);
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


    const startGetQuestionsBySection = useCallback(async (guideId: number, page = 1) => {
        const sectionQuestions = await questionRepository.getQuestionBySection(guideId, page);
        typeof sectionQuestions !== 'string' && dispatch({ type: 'QUESTION - Get Question to user', payload: sectionQuestions });
    }, []);

    const clearQuestionBySection = () => dispatch({ type: 'QUESTION - Clear Question Cache' });

    const createBodyRequest = (formQuestionData: QuestionsField): SaveUserQuestionDto => {
        const body = Object.entries(formQuestionData).map(([key, value]) => {
            const question_id = key.split("_").pop();
            return { question_id: question_id!, qualification: JSON.parse(value) }
        });

        return { questions: body }
    }

    const saveQuestionUser = async (questions: QuestionsField) => {
        const formQuestionData = createBodyRequest(questions!);
        const { success } = await questionRepository.saveUserAnswers(formQuestionData, 'gradable');
        if(!success) return navigate('/auth/')

    }

    const saveQuestionNongradableUser = async (questions: QuestionsField) => {
        const formQuestionData = createBodyRequest(questions!);
        const { success } = await questionRepository.saveUserAnswers(formQuestionData, 'nongradable');
        if(!success) return navigate('/auth/')
    }

    const clearNewQuestionCache = () => dispatch({ type: 'QUESTION - Clear new Question Cache' });


    return {
        loading,
        questions,
        question,
        sectionQuestions,
        totalQuestions,
        currentPage,
        toggleLoading,
        startGetQuestions,
        startCreateQuestion,
        startShowQuestion,
        clearQuestionBySection,
        saveQuestionUser,
        saveQuestionNongradableUser,
        startGetQuestionsBySection,
        clearNewQuestionCache,
    }
}
