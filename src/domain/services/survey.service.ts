import { useContext, useState } from 'react';
import { SurveyContext } from '../../infraestructure/context/survey';
import { surveyRepository } from '../../infraestructure/repositories/survey.repository';
import { useNavigate } from 'react-router-dom';


export const surveyService = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch, surveys, hasSurvey, surveyUser } = useContext(SurveyContext);

    const toggleLoading = () => setLoading(prev => !prev);

    const startGetSurveys = async (): Promise<void> => {
        toggleLoading();
        const response = await surveyRepository.startGetSurveys();
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get all surveys', payload: response.surveys });
        toggleLoading();
    }

    const startSurveyUser = async () => {
        const { success } = await surveyRepository.startSurveyByUser();
        success && navigate('questions', { replace: true });
    }

    const endSurveyUser = async () => {
        const { success } = await surveyRepository.endSurveyByUser();
        success && navigate('success-answer', { replace: true });
    }

    const hasAvailableSurvey = async () => {
        const hasSurvey = await surveyRepository.existAvailableSurvey();
        dispatch({ type: 'SURVEY - Exist available survey', payload: hasSurvey });
    }

    const clearCacheForAvailableSurvey = () => dispatch({type: 'SURVEY - Clear cache for available survey'});

    const getSurveyById = async(surveyId: string) => {
        const response = await surveyRepository.getSurvey(surveyId);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey details', payload: response });
    }


    return {
        loading,
        surveys,
        hasSurvey,
        surveyUser,
        startGetSurveys,
        startSurveyUser,
        endSurveyUser,
        hasAvailableSurvey,
        clearCacheForAvailableSurvey,
        getSurveyById,
    }

}
