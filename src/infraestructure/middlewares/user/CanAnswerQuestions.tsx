import { Fragment, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '../../components/ui';
import { guideService } from '../../../domain/services/guide.service';


interface Props {
    children: ReactNode | Array<ReactNode>
}
export const CanAnswerQuestions = ({ children }: Props) => {

    const { hasGuide, hasAvailableGuide } = guideService();

    useEffect(() => {
        hasAvailableGuide();
    }, []);


    console.log(hasGuide);
    

    return (
        <Fragment>
           {
                typeof hasGuide === 'object' ? (
                    <LoadingScreen title="Cargando" />
                ) : (
                    hasGuide ? children : <Navigate to="no-available" replace />
                )
            }
        </Fragment>
    )
}
