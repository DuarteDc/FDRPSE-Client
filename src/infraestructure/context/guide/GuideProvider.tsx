import { ReactNode, useReducer } from 'react'
import { Guide, GuideDetail, GuideQualification, GuideUser } from '../../../domain/models';
import { GuideContext, guideReducer } from '.';

export interface GuideState {
    guide           : Guide | null;
    detail          : GuideDetail | null;
    guides          : Array<Guide> | [];
    qualifications  : GuideQualification | null;
    guideUser       : GuideUser | null;
    hasGuide        : boolean | null;
    guidesSelected   : Array<Guide> | [];
}

interface Props {
    children: ReactNode;
}

const GUIDE_INITIAL_STATE: GuideState = {
    guide  : null,
    guides : [],
    detail : null,
    qualifications: null,
    guideUser: null,
    hasGuide: null,
    guidesSelected: []
}


export const GuideProvider = ({ children }: Props) => {
    
    const [state, dispatch] = useReducer(guideReducer, GUIDE_INITIAL_STATE);

    return (
        <GuideContext.Provider value={{...state, dispatch}}>
            { children }
        </GuideContext.Provider>
    )
}
