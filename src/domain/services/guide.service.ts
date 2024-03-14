import { useCallback, useContext, useState } from 'react';
import { GuideContext } from '../../infraestructure/context/guide';
import { CreateGuideDto } from '../../infraestructure/http/dto/guide';
import { guideRepository } from '../../infraestructure/repositories/guide.repository';
import { GuideQualifications } from '../models';

interface GuideNameAndType {
    name: string;
    gradable: boolean;
}

export const guideService = () => {

    const { dispatch, guide, qualifications, guides } = useContext(GuideContext);

    const [loading, setLoading] = useState(false);

    const toggleLoading = () => setLoading(prev => !prev);

    const startGetGuides = useCallback(async (query: string) => {
        toggleLoading();
        const guides = await guideRepository.getGuides(query);
        typeof guides !== 'string' && dispatch({ type: 'GUIDE - Load Guides by query params', payload: guides })
        toggleLoading();
    }, []);

    const startCreateGuide = useCallback(async (createGuideDto: CreateGuideDto) => {
        toggleLoading();
        const { message, success } = await guideRepository.createGuide(createGuideDto);
        console.log({ message, success })
        toggleLoading();
    }, []);

    const handleSetNameAndType = (guideNameAndType: GuideNameAndType) => {
        dispatch({ type: 'GUIDE - Presave name and type', payload: guideNameAndType })
    }

    const setQualifications = (qualifications: GuideQualifications) => dispatch({ type: 'GUIDE - Set qualification', payload: qualifications });

    return {
        guide,
        guides,
        loading,
        qualifications,
        startGetGuides,
        startCreateGuide,
        setQualifications,
        handleSetNameAndType,
    }
}
