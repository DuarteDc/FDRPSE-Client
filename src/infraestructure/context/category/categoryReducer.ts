import { CategoryState } from './';

import { Category, CategoryQualifications } from '../../../domain/models';


export type CategoryActionType =
    | { type: 'CATEGORY - Start load category', payload: Category }
    | { type: 'CATEGORY - Start load categories', payload: Array<Category> }
    | { type: 'CATEGORY - Start load categories with qualifications', payload: Array<CategoryQualifications> }

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

        default:
            return state;
    }


}
