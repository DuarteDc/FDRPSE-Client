import { useContext } from 'react';
import { GuideContext } from '../../infraestructure/context/guide';
import { TypeGudie } from '../models';

interface GuideNameAndType {
    name    : string;
    gradable: boolean;
}

export const guideService = () => {

    const { dispatch, guide } = useContext(GuideContext);

    const handleSetNameAndType = (guideNameAndType: GuideNameAndType) => {
        dispatch({ type: 'GUIDE - Presave name and type', payload: guideNameAndType })
    }


    return {

        guide,


        handleSetNameAndType,
    }
}
