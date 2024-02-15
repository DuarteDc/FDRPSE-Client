import { useContext, useState } from 'react';
import { SurveyContext } from '../../infraestructure/context/survey';
import { surveyRepository } from '../../infraestructure/repositories/survey.repository';
import { useNavigate } from 'react-router-dom';
import { Area } from '../models';


export const surveyService = () => {

    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<Array<Area>>([]);
    const navigate = useNavigate();
    const { dispatch, surveys, hasSurvey, surveyUser, users, userDetail, totalUsersInSurvey } = useContext(SurveyContext);

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

    const clearCacheForAvailableSurvey = () => dispatch({ type: 'SURVEY - Clear cache for available survey' });

    const getSurveyById = async (surveyId: string) => {
        const response = await surveyRepository.getSurvey(surveyId);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey details', payload: response });
    }

    const searchByNameAndArea = async (surveyId: string, name = '', area = '') => {
        toggleLoading();
        const response = await surveyRepository.searchByNameAndArea(surveyId, name, area);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey details', payload: response });
        toggleLoading();
    }

    const getAreasToSearch = async () => {
        toggleLoading();
        const response = await surveyRepository.getAreas();
        typeof response !== 'string' && setAreas(response);
        toggleLoading();
    }

    const getTotalUsersInSurvey = async () => {
        const response = await surveyRepository.getTotalUsers();
        typeof response === 'number' && dispatch({ type: 'SURVEY - Get total users', payload: response });
    }

    const getUserDetail = async (surveyId: string, userId: string) => {
        toggleLoading();
        const response = await surveyRepository.getUserDetail(surveyId, userId);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey user detail', payload: response });
        toggleLoading();
    }

    const startNewSurvey = async () => {
        toggleLoading();
        const response = await surveyRepository.startNewSurvey();
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Start new survey', payload: response });
        toggleLoading();
    }

    return {
        loading,
        surveys,
        hasSurvey,
        surveyUser,
        areas,
        users,
        totalUsersInSurvey,
        userDetail,
        startGetSurveys,
        startNewSurvey,
        startSurveyUser,
        endSurveyUser,
        hasAvailableSurvey,
        clearCacheForAvailableSurvey,
        getSurveyById,
        searchByNameAndArea,
        getAreasToSearch,
        getTotalUsersInSurvey,
        getUserDetail
    }

}
