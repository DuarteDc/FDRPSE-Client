import { CategoryState } from './';

import { Category, CategoryQualifications } from '../../../domain/models';


export type CategoryActionType =
    | { type: 'CATEGORY - Start load category', payload: CategoryQualifications }
    | { type: 'CATEGORY - Start load categories', payload: Array<Category> }
    | { type: 'CATEGORY - Start load categories with qualifications', payload: Array<CategoryQualifications> }
    | { type: 'CATEGORY - Start load category with qualifications', payload: CategoryQualifications }

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

        default:
            return state;
    }


}
