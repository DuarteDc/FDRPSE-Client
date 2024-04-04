import { ReactNode, useReducer } from 'react'
import { Guide, GuideUser } from '../../../domain/models';
import { GuideContext, guideReducer } from '.';

export interface GuideState {
    guide           : any;
    guides          : Array<Guide> | [];
    qualifications  : null | any;
    guideUser       : GuideUser | null;
    hasGuide        : boolean | null;
}

interface Props {
    children: ReactNode;
}

const GUIDE_INITIAL_STATE: GuideState = {
    guide  : null,
    guides : [],
    qualifications: null,
    guideUser: null,
    hasGuide: null,
}


export const GuideProvider = ({ children }: Props) => {
    
    const [state, dispatch] = useReducer(guideReducer, GUIDE_INITIAL_STATE);

    return (
        <GuideContext.Provider value={{...state, dispatch}}>
            { children }
        </GuideContext.Provider>
    )
}
