import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

interface Props {
  children: ReactNode,
}

export const AuthRoutes = ({ children }: Props) => {

  const { logged } = useContext(AuthContext);

  return logged ? children : <Navigate to="/" replace />
}
