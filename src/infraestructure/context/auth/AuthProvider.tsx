import { ReactNode, useReducer } from 'react';
import { User } from '../../../domain/models/User';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

export interface AuthState {
    logged: boolean,
    user: User | {},
}

const AUTH_INITIAL_STATE: AuthState = {
    logged: false,
    user: {}
}

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);


    return (
        <AuthContext.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider >
    )

}