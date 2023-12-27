import { Dispatch, createContext } from 'react';
import { AuthActionType, AuthState } from './';

interface ContextProps extends AuthState { 
    dispatch : Dispatch<AuthActionType>
}

export const AuthContext = createContext({} as ContextProps);