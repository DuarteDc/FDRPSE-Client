import { CategoryState } from './';

import { Category } from '../../../domain/models';


export type CategoryActionType =
    | { type: 'CATEGORY - Start load category', payload: Category }
    | { type: 'CATEGORY - Start load categories', payload: Array<Category> }

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

        default:
            return state;
    }


}
