import { useContext, useState } from 'react';
import { SurveyContext } from '../../infraestructure/context/survey';
import { surveyRepository } from '../../infraestructure/repositories/survey.repository';


export const surveyService = () => {

    const [loading, setLoading] = useState(false);

    const { dispatch, surveys } = useContext(SurveyContext);

    const toggleLoading = () => setLoading(prev => !prev);

    const startGetSurveys = async (): Promise<void> => {
        toggleLoading();
        const response = await surveyRepository.startGetSurveys();
        typeof response !== 'string' && dispatch({ type: 'SURVEY - Get all surveys', payload: response.surveys });
        toggleLoading();
    }

    return {
        loading,
        surveys,
        startGetSurveys,
    }


}
