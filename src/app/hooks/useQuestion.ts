import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionContext } from '../../infraestructure/context/questions';
import { Question } from '../../domain/models';

import { categoriesService } from '../../domain/services/categories.service';
import { domianService } from '../../domain/services/domian.service';
import { dimensionService } from '../../domain/services/dimension.service';
import { CreateQuestionDto } from '../../infraestructure/http/dto/questions';
import { CREATE_QUESTION_ROUTES } from '../helpers/routes';

export const useQuestion = () => {

    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const { dispatch, question, questions } = useContext(QuestionContext);

    const { startGetCategories, categories } = categoriesService();
    const { startGetDomains, domains } = domianService();
    const { startGetDimensions, dimensions } = dimensionService();

    const getQuestionDetailsBeforeSave = ({ category_id = '', dimension_id = '', domain_id = '' }) => ({
        category: categories.find(category => category.id == category_id),
        dimension: dimensions.find(dimension => dimension.id == dimension_id),
        domain: domains.find(domain => domain.id == domain_id),
    });

    const preSaveQuestion = ({ question, ...rest }: CreateQuestionDto) => {
        const getDetails = getQuestionDetailsBeforeSave(rest);
        dispatch({
            type: 'QUESTION - Presave question',
            payload: {
                ...new Question(crypto.randomUUID(), question, new Date().toLocaleString(), new Date().toLocaleString()),
                ...getDetails,
            },
        });
        navigate("#/add-qualification");
    }

    const startGetCategoriesDomainAndDimenstions = async (): Promise<void> => {
        setLoading(prev => !prev);
        await Promise.all([startGetCategories(), startGetDomains(), startGetDimensions()]);
        setLoading(prev => !prev);
    }

    const increaseSteps = (maxStep: number) => {
        console.log(maxStep);
        if (maxStep <= steps) return;
        setSteps(prev => prev + 1)
    }

    const decreaseSteps = () => {
        if (steps <= 0) return;
        setSteps(prev => prev - 1)
    }

    console.log(steps);



    return {
        loading,
        question,
        questions,
        preSaveQuestion,
        startGetCategoriesDomainAndDimenstions,
        steps,
        increaseSteps,
        decreaseSteps
    }
}
