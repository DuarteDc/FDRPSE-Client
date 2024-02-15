import { ReactNode, useReducer } from 'react';
import { CategoryContext, categoryReducer } from './';
import { Category, CategoryQualifications } from '../../../domain/models';



export interface CategoryState {
    category    : Category | null;
    categories  : Array<Category>
    categoriesQualifications: Array<CategoryQualifications>
}

interface Props {
    children    : ReactNode;
}

const CATEGOTY_INITIAL_STATE: CategoryState = {
    category    : null,
    categories  : [],
    categoriesQualifications  : []
}

export const CategoryProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(categoryReducer, CATEGOTY_INITIAL_STATE);

    return (
        <CategoryContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    )
}
