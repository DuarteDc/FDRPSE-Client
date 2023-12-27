import { createContext } from 'react';
import { UIState } from './UIProvider';


interface ContextProps extends UIState { }

export const UIContext = createContext({} as ContextProps);