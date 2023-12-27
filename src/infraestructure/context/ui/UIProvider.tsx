import { ReactNode, useReducer } from 'react';
import { UIContext } from './UIContext';
import uiReducer from './uiReducer';

export interface UIState {
    loading: false,
}

const UI_INITIAL_STATE: UIState = {
    loading: false,
}

interface Props {
    children: ReactNode;
}

export const UIProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    return (
        <UIContext.Provider value={{ ...state }}>
            {children}
        </UIContext.Provider>
    )
}
