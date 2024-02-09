import { Fragment, ReactNode, useEffect } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '../../components/ui';


interface Props {
    children: ReactNode | Array<ReactNode>
}
export const CanAnswerQuestions = ({ children }: Props) => {

    const { hasAvailableSurvey, hasSurvey, clearCacheForAvailableSurvey } = surveyService();

    useEffect(() => {
        hasAvailableSurvey();
        return () => {
            clearCacheForAvailableSurvey()
        }
    }, []);

    return (
        <Fragment>
            {
                typeof hasSurvey === 'object' ? (
                    <LoadingScreen title="Cargando" />
                ) : (
                    hasSurvey ? children : <Navigate to="no-available" replace />
                )
            }
        </Fragment>
    )
}
