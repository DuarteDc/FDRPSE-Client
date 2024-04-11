import { useCallback, useContext, useState } from 'react';
import { GuideContext } from '../../infraestructure/context/guide';
import { CreateGuideDto } from '../../infraestructure/http/dto/guide';
import { guideRepository } from '../../infraestructure/repositories/guide.repository';
import { useNavigation } from '../../app/hooks/useNavigation';

interface GuideNameAndType {
    name: string;
    gradable: boolean;
}

export const guideService = () => {

    const { dispatch, guide, qualifications, guides, guideUser, hasGuide, guidesSelected } = useContext(GuideContext);

    const { navigate } = useNavigation();

    const [loading, setLoading] = useState(false);

    const toggleLoading = () => setLoading(prev => !prev);

    const startGetGuides = useCallback(async (query: string) => {
        toggleLoading();
        const guides = await guideRepository.getGuides(query);
        typeof guides !== 'string' && dispatch({ type: 'GUIDE - Load Guides by query params', payload: guides })
        toggleLoading();
    }, []);


    const startGetGuide = useCallback(async (guideId: string) => {
        toggleLoading();
        const guide = await guideRepository.getGuide(guideId);
        typeof guide !== 'string' && dispatch({ type: 'GUIDE - Load Guide', payload: guide })
        toggleLoading();
    }, []);

    const startGetGuideBySurvey = useCallback(async (surveyId: string, guideId: string) => {
        toggleLoading();
        const guide = await guideRepository.getGuideBySurvey(surveyId, guideId);
        typeof guide !== 'string' && dispatch({ type: 'GUIDE - Load Guide', payload: guide })
        toggleLoading();
    }, []);

    const startCreateGuide = useCallback(async (createGuideDto: CreateGuideDto) => {
        toggleLoading();
        const { message, success } = await guideRepository.createGuide(createGuideDto);
        success && navigate(-1)
        toggleLoading();
    }, []);

    const handleSetNameAndType = (guideNameAndType: GuideNameAndType) => {
        dispatch({ type: 'GUIDE - Presave name and type', payload: guideNameAndType })
    }

    const setQualifications = (qualifications: any) => dispatch({ type: 'GUIDE - Set qualification', payload: qualifications });


    const hasAvailableGuide = async () => {
        toggleLoading();
        const guide = await guideRepository.existAvailableGuide();
        if (typeof guide !== 'string') dispatch({ type: 'GUIDE - set guideUser', payload: guide });
        else dispatch({ type: 'GUIDE - set has Guide', payload: false });
        toggleLoading();
    }

    const clearSelectedGuide = () => dispatch({ type: 'GUIDE - Clear selecte guides', payload: '' })

    return {
        guide,
        guides,
        loading,
        hasGuide,
        guideUser,
        guidesSelected,
        qualifications,
        startGetGuide,
        startGetGuides,
        startCreateGuide,
        hasAvailableGuide,
        setQualifications,
        clearSelectedGuide,
        startGetGuideBySurvey,
        handleSetNameAndType,
    }
}
