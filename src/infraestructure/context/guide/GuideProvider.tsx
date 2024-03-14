import { ReactNode, useReducer } from 'react'
import { Guide, GuideQualifications } from '../../../domain/models';
import { GuideContext, guideReducer } from '.';

export interface GudieState {
    guide   : Guide | null;
    guides  : Array<Guide> | [];
    qualifications: GuideQualifications | null;
}

interface Props {
    children: ReactNode;
}

const GUIDE_INITIAL_STATE: GudieState = {
    guide  : null,
    guides : [],
    qualifications: null,
}


export const GuideProvider = ({ children }: Props) => {
    
    const [state, dispatch] = useReducer(guideReducer, GUIDE_INITIAL_STATE);

    return (
        <GuideContext.Provider value={{...state, dispatch}}>
            { children }
        </GuideContext.Provider>
    )
}
