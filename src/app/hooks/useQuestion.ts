import { useCallback, useContext, useState } from 'react';

import { QuestionContext } from '../../infraestructure/context/questions';

import { categoriesService } from '../../domain/services/categories.service';
import { domianService } from '../../domain/services/domian.service';
import { dimensionService } from '../../domain/services/dimension.service';
import { sectionService } from '../../domain/services/section.service';
import { Qualification, Question, Section } from '../../domain/models';
import { CreateQuestionDto } from '../../infraestructure/http/dto/questions';

export const useQuestion = () => {

    const [loading, setLoading] = useState(false);

    const { question, questions, dispatch } = useContext(QuestionContext);

    const { startGetCategories, categories } = categoriesService();
    const { startGetDomains, domains } = domianService();
    const { startGetDimensions, dimensions } = dimensionService();
    const { startGetSections, sections } = sectionService();

    const startGetCategoriesDomainAndDimenstions = async (): Promise<void> => {
        setLoading(prev => !prev);
        await Promise.all([startGetCategories(), startGetDomains(), startGetDimensions(), startGetSections()]);
        setLoading(prev => !prev);
    }

    const getQuestionDetailsBeforeSave = ({ category_id = '', dimension_id = '', domain_id = '', section_id = '' }) => ({
        category: categories.find(category => category.id == category_id),
        dimension: dimensions.find(dimension => dimension.id == dimension_id),
        domain: domains.find(domain => domain.id == domain_id),
        section: sections.find(section => section.id == section_id)
    });

    const preSaveQuestion = ({ question, ...rest }: CreateQuestionDto): void => {
        const getDetails = getQuestionDetailsBeforeSave(rest);
        dispatch({
            type: 'QUESTION - Presave question',
            payload: {
                ...new Question(crypto.randomUUID(), question, new Date().toLocaleString(), new Date().toLocaleString()),
                ...getDetails,
            },
        });
    }

    const setQualificationBeforeSave = (qualification: Qualification) => {
        if (qualification.id === question?.qualification?.id) return;
        dispatch({ type: 'QUESTION - Set qualification before save', payload: qualification! });
    }

    const setSectionBeforeSave = (section: Section) => {
        if (section.id === question?.section?.id) return;
        dispatch({ type: 'QUESTION - Set section before save', payload: section });
    }

    return {
        loading,
        question,
        sections,
        dimensions,
        categories,
        domains,
        questions,
        preSaveQuestion,
        setSectionBeforeSave,
        setQualificationBeforeSave,
        startGetCategoriesDomainAndDimenstions,
    }
}
