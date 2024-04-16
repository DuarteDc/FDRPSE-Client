import { Survey, Pagination, GuideUserSurvey, GuideSurveyUserDetail, FinalizeGuideAndStartNextGuide } from '../../../domain/models';
import { type SurveyState } from './';

export type SurveyActionType =
    | { type: 'SURVEY - Get all surveys', payload: Pagination }
    | { type: 'SURVEY - Get show surveys', payload: Survey }
    | { type: 'SURVEY - Get survey guide detail', payload: Array<GuideUserSurvey> }
    | { type: 'SURVEY - Start new survey', payload: Survey }
    | { type: 'SURVEY - Exist available survey', payload: boolean }
    | { type: 'SURVEY - Clear cache for available survey' }
    | { type: 'SURVEY - Get survey details', payload: Array<any> }
    | { type: 'SURVEY - Get total users', payload: number }
    | { type: 'SURVEY - Get survey user detail', payload: GuideSurveyUserDetail }
    | { type: 'SURVEY - End survey', payload: string }
    | { type: 'GUIDE - Change Guide Status', payload: { surveyId: string, guideId: number, status: number } }
    | { type: 'GUIDE - Finalize Guide and Start Next Guide', payload: FinalizeGuideAndStartNextGuide }

export const surveyReducer = (state: SurveyState, action: SurveyActionType) => {

    switch (action.type) {

        case 'SURVEY - Get all surveys':
            return {
                ...state,
                surveys: action.payload
            }

        case 'SURVEY - Get show surveys':
            return {
                ...state,
                survey: action.payload,
            }

        case 'SURVEY - Get survey guide detail':
            return {
                ...state,
                guideUserSurvey: action.payload,
            }

        case 'SURVEY - Exist available survey':
            return {
                ...state,
                hasSurvey: action.payload,
            }

        case 'SURVEY - Clear cache for available survey':
            return {
                ...state,
                hasSurvey: null
            }

        case 'SURVEY - Get survey details':
            return {
                ...state,
                surveyUser: action.payload,
                totalUsersInSurvey: state.totalUsersInSurvey > 0 ? state.totalUsersInSurvey : action.payload.length,
            }

        case 'SURVEY - Get total users':
            return {
                ...state,
                users: action.payload
            }


        case 'SURVEY - Get survey user detail':
            return {
                ...state,
                userDetail: action.payload,
            }

        case 'GUIDE - Change Guide Status': {
            return {
                ...state,
                survey: {
                    id: state.survey!.id,
                    startDate: state.survey!.startDate,
                    endDate: state.survey!.endDate,
                    status: state.survey!.status,
                    createdAt: state.survey!.createdAt,
                    updatedAt: state.survey!.updatedAt,
                    total: state.survey!.total,
                    guides: state.survey?.guides?.map(guide => guide.id === action.payload.guideId ?
                        ({ ...guide, status: guide.status = action.payload.status })
                        : guide) || undefined,
                }
            }
        }

        case 'GUIDE - Finalize Guide and Start Next Guide':
            return (action.payload.nextGuide) ? {
                ...state,
                survey: {
                    ...state!.survey!,
                    guides: state.survey!.guides!.map(guide => {
                        if (guide.id === action.payload.currentGuide!.id)
                            return { ...guide, status: guide.status = action.payload.currentGuide!.status }

                        if (guide.id === action.payload.nextGuide!.id)
                            return { ...guide, status: guide.status = action.payload.nextGuide!.status }

                        return guide;
                    })
                }
            } : {
                ...state,
                survey: {
                    ...state!.survey!,
                    guides: state.survey!.guides!.map(guide => guide.id === action.payload.currentGuide.id ? { ...guide, status: guide.status = action.payload.currentGuide.status } : guide),
                }
            }

        default:
            return state

    }

}
