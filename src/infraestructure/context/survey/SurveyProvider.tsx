import { ReactNode, useReducer } from 'react';
import { SurveyContext, surveyReducer } from './';
import { Survey, SurveyUser } from '../../../domain/models';


interface Props {
    children: ReactNode
}
export interface SurveysPagination {
    surveys     : Array<Survey>,
    currentPage : number;
    nextPageUrl : string;
    prevPageUrl : string;
}

export interface SurveyState {
    survey              : Survey | null;
    surveys             : Array<Survey> | []
    hasSurvey           : boolean | null;
    surveyUser          : Array<SurveyUser> | [];
    users               : number;
    userDetail          : SurveyUser | null;
    totalUsersInSurvey  : number;
}

const INITIAL_STATE: SurveyState = {
    survey              : null,
    surveys             : [],
    hasSurvey           : null,
    surveyUser          : [],
    users               : 0,
    userDetail          : null,
    totalUsersInSurvey  : 0
}

const SurveyProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(surveyReducer, INITIAL_STATE);


    return (
        <SurveyContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SurveyContext.Provider>
    )
}

export default SurveyProvider