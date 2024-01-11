import { useContext, useState } from 'react';

import { QuestionContext } from '../../infraestructure/context/questions';

import { categoriesService } from '../../domain/services/categories.service';
import { domianService } from '../../domain/services/domian.service';
import { dimensionService } from '../../domain/services/dimension.service';

export const useQuestion = () => {

    const [loading, setLoading] = useState(false);

    const { question, questions, preSaveQuestion } = useContext(QuestionContext);

    const { startGetCategories } = categoriesService();
    const { startGetDomains } = domianService();
    const { startGetDimensions } = dimensionService();

    const startGetCategoriesDomainAndDimenstions = async (): Promise<void> => {
        setLoading(prev => !prev);
        await Promise.all([startGetCategories(), startGetDomains(), startGetDimensions()]);
        setLoading(prev => !prev);
    }

    return {
        loading,
        question,
        questions,
        startGetCategoriesDomainAndDimenstions,
        preSaveQuestion
    }
}
