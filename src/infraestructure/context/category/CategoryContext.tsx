import { Dispatch, createContext } from 'react';

import { CategoryActionType, CategoryState } from './';

interface ContextProps extends CategoryState { 
    dispatch : Dispatch<CategoryActionType>
}

export const CategoryContext = createContext({} as ContextProps);