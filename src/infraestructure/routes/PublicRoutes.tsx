import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

interface Props {
    children: ReactNode,
}

export const PublicRoutes = ({ children }: Props) => {

    const { user, logged } = useContext(AuthContext);

    return logged ? <Navigate to="/admin/" replace /> : children;
}
