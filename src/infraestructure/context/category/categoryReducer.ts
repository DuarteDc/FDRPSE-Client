import { CategoryState } from './';

import { Category, CategoryQualifications } from '../../../domain/models';
import { CommonQualifictions } from '../../components/ui/FormQualification';


export type CategoryActionType =
    | { type: 'CATEGORY - Start load category', payload: CategoryQualifications }
    | { type: 'CATEGORY - Start load categories', payload: Array<Category> }
    | { type: 'CATEGORY - Start load categories with qualifications', payload: Array<CategoryQualifications> }
    | { type: 'CATEGORY - Start load category with qualifications', payload: CategoryQualifications }
    | { type: 'CATEGORY - Start load category with qualifications', payload: CategoryQualifications }
    | { type: 'CATEGORY - Start add qualification', payload: CategoryQualifications }
    | { type: 'CATEGORY - Start clear cache category', }


export const categoryReducer = (state: CategoryState, action: CategoryActionType): CategoryState => {
    switch (action.type) {
        case 'CATEGORY - Start load category':
            return {
                ...state,
                category: action.payload
            }

        case 'CATEGORY - Start load categories':
            return {
                ...state,
                categories: action.payload
            }

        case 'CATEGORY - Start load categories with qualifications':
            return {
                ...state,
                categoriesQualifications: action.payload
            }


        case 'CATEGORY - Start load category with qualifications':
            return {
                ...state,
                category: action.payload
            }

        case 'CATEGORY - Start add qualification':
            return {
                ...state,
                category: action.payload
            }

        case 'CATEGORY - Start clear cache category':
            return {
                ...state,
                category: null
            }

        default:
            return state;
    }


}
