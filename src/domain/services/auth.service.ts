import { useContext, useState } from 'react';
import { AuthContext } from '../../infraestructure/context/auth';

import { authRepository } from '../../infraestructure/repositories/auth.repository';
import { User } from '../models/User';

import type { LoginRequestDto } from '../../infraestructure/http/dto/auth';

export const authService = () => {

    const { dispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const startSignin = async (data: LoginRequestDto): Promise<void> => {
        setLoading(true);
        const user = await authRepository.signin(data);
        user instanceof User && dispatch({ type: 'AUTH - Login', payload: user });
        setLoading(false);
    }

    const startRevalidateSession = async (): Promise<void> => {
        setLoading(true);
        setTimeout(async () => {
            const user = await authRepository.revalidateSession();
            user instanceof User && dispatch({ type: 'AUTH - Login', payload: user });
            setLoading(false)
        }, 2000)
    }


    return { startSignin, startRevalidateSession, loading, }
}
