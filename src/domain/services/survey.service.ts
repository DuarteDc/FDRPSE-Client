import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SurveyContext } from '../../infraestructure/context/survey';
import { surveyRepository } from '../../infraestructure/repositories/survey.repository';
import { StartNewSurveyDto } from '../../infraestructure/http/dto/surveys';
import { Area, StatusGuide } from '../models';


export const surveyService = () => {

    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<Array<Area>>([]);
    const navigate = useNavigate();
    const { dispatch, surveys, hasSurvey, guideUserSurvey, users, userDetail, totalUsersInSurvey, survey } = useContext(SurveyContext);

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

    const clearCacheForAvailableSurvey = () => dispatch({ type: 'SURVEY - Clear cache for available survey' });

    const getAreasToSearch = async () => {
        toggleLoading();
        const areas = await surveyRepository.getAreas();
        typeof areas !== 'string' && setAreas(areas);
        toggleLoading();
    }

    const getGuideSurveyUserDetail = async (surveyId: string, guideId: string) => {
        toggleLoading();
        const response = await surveyRepository.searchInGuideSurveyUserDetail(surveyId, guideId);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey guide detail', payload: response });
        toggleLoading();
    }

    const startSearchGuideSurveyUserDetail = async (surveyId: string, guideId: string, name = '', areaId = '', subareaId = '') => {
        toggleLoading();
        const response = await surveyRepository.searchInGuideSurveyUserDetail(surveyId, guideId, name, areaId, subareaId);
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get survey guide detail', payload: response });
        toggleLoading();
    }

    const getTotalUsersInSurvey = async () => {
        const response = await surveyRepository.getTotalUsers();
        typeof response === 'number' && dispatch({ type: 'SURVEY - Get total users', payload: response });
    }

    const getUserDetail = async (surveyId: string, userId: string, guideId: string) => {
        toggleLoading();
        const response = await surveyRepository.getUserDetail(surveyId, userId, guideId);
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
        const survey = await surveyRepository.finalizeSurvey(surveyId);
        typeof survey !== 'string' && dispatch({ type: 'SURVEY - End survey', payload: survey });
        toggleLoading();
    }

    const startDownloadSurveyUserResume = async () => {
        toggleLoading();
        await surveyRepository.downloadSurveyUserResume();
        toggleLoading();
    }

    const startFinalizeGuideSurvey = async (surveyId: string, guideId: string) => {
        toggleLoading();
        const guides = await surveyRepository.finalizeGuideSurveyAndStartNextGuide(surveyId, guideId);
        typeof guides !== 'string' && dispatch({ type: 'GUIDE - Finalize Guide and Start Next Guide', payload: guides });
        toggleLoading();
    }

    const startPausedOrContinueGuide = async (surveyId: string, guideId: string, status: StatusGuide.inProgress | StatusGuide.paused) => {
        toggleLoading();
        const guide = await surveyRepository.changeSurveyGuideStatus(surveyId, guideId, status);
        typeof guide !== 'string' && dispatch({ type: 'GUIDE - Change Guide Status', payload: { surveyId, guideId: guide.guide.id, status: guide.guide.status } })
        toggleLoading();
    }

    const startGuide = async (surveyId: string, guideId: number) => {
        toggleLoading();
        const { success } = await surveyRepository.startGuideAndPauseOtherGuides(surveyId, `${guideId}`);
        success && dispatch({ type: 'SURVER - Start guide to be available for users', payload: guideId });
        toggleLoading();
    }


    return {
        loading,
        surveys,
        survey,
        hasSurvey,
        guideUserSurvey,
        areas,
        users,
        totalUsersInSurvey,
        userDetail,
        startGetSurveys,
        startShowSurvey,
        startNewSurvey,
        startSurveyUser,
        endSurveyUser,
        handleAddAndDeleteAreas,
        clearCacheForAvailableSurvey,
        getAreasToSearch,
        startFinalizeGuideSurvey,
        getTotalUsersInSurvey,
        getUserDetail,
        startFinalizeSurvey,
        startDownloadSurveyUserResume,
        getGuideSurveyUserDetail,
        startGuide,
        startSearchGuideSurveyUserDetail,
        startPausedOrContinueGuide,
    }

}
