import { AuthState } from './AuthProvider';
import { User } from '../../../domain/models/User';

export type AuthActionType =
    | { type: 'AUTH - Login', payload: User }
    | { type: 'AUTH - Logout' }


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case 'AUTH - Login':
            return {
                ...state,
                logged: true,
                user: action.payload
            }

        case 'AUTH - Logout':
            return {
                ...state,
                logged: false,
                user: null
            }

        default:
            return state;
    }
}
