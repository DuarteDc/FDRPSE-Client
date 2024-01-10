import { useContext, useEffect } from 'react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { StepsCreateQuestion } from '../../../infraestructure/components/questions';
import { useQuestion } from '../../hooks/useQuestion';


export const CreateQuestionPage = () => {

    const { startGetCategoriesDomainAndDimenstions } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <StepsCreateQuestion />
        </PageLayout>
    )
}


