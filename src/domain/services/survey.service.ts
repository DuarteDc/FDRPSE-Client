import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SurveyContext } from '../../infraestructure/context/survey';
import { surveyRepository } from '../../infraestructure/repositories/survey.repository';
import { StartNewSurveyDto } from '../../infraestructure/http/dto/surveys';
import { Area } from '../models';


export const surveyService = () => {

    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<Array<Area>>([]);
    const navigate = useNavigate();
    const { dispatch, surveys, hasSurvey, surveyUser, users, userDetail, totalUsersInSurvey, survey } = useContext(SurveyContext);

    const handleAddAndDeleteAreas = useCallback((area: Area, add: boolean) => {
        if (add) {
            return setAreas(prev => [area, ...prev]);
        }
        setAreas(prev => prev.filter(memoArea => memoArea.id !== area.id))
    }, []);

    const toggleLoading = () => setLoading(prev => !prev);

    const startGetSurveys = async (page: number): Promise<void> => {
        toggleLoading();
        const response = await surveyRepository.startGetSurveys(page);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get all surveys', payload: response });
        toggleLoading();
    }

    const startShowSurvey = async (surveyId: string): Promise<void> => {
        toggleLoading();
        const survey = await surveyRepository.showSurvey(surveyId);
        typeof survey !== 'string' && dispatch({ type: 'SURVEY - Get show surveys', payload: survey });
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
        dispatch({ type: 'Guide', payload: hasSurvey });
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

    // const getAreasToSearch = async () => {
    //     toggleLoading();
    //     const response = await surveyRepository.getAreas();
    //     typeof response !== 'string' && setAreas(response);
    //     toggleLoading();
    // }

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

    const startNewSurvey = async (startNewSurvey: StartNewSurveyDto) => {
        toggleLoading();
        const response = await surveyRepository.startNewSurvey(startNewSurvey);
        if (typeof response !== 'string') {
            dispatch({ type: 'SURVEY - Start new survey', payload: response });
            navigate(`/auth/show/${response?.id}`);
        }
        toggleLoading();
    }

    const startFinalizeSurvey = async (surveyId: string) => {
        toggleLoading();
        const { success } = await surveyRepository.finalizeSurvey(surveyId);
        success && dispatch({ type: 'SURVEY - End survey', payload: surveyId });
        toggleLoading();
    }

    const startDownloadSurveyUserResume = async () => {
        toggleLoading();
        await surveyRepository.downloadSurveyUserResume();
        toggleLoading();
    }

    return {
        loading,
        surveys,
        survey,
        hasSurvey,
        surveyUser,
        areas,
        users,
        totalUsersInSurvey,
        userDetail,
        startGetSurveys,
        startShowSurvey,
        startNewSurvey,
        startSurveyUser,
        endSurveyUser,
        hasAvailableSurvey,
        handleAddAndDeleteAreas,
        clearCacheForAvailableSurvey,
        getSurveyById,
        searchByNameAndArea,
        // getAreasToSearch,
        getTotalUsersInSurvey,
        getUserDetail,
        startFinalizeSurvey,
        startDownloadSurveyUserResume,
    }

}
