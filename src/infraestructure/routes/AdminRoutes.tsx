import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';


interface Props {
    children   : ReactNode | Array<ReactNode>
}

const ADMIN_ROLE = "5";

export const AdminRoutes = ({ children }: Props) => {

    const { user } = useContext(AuthContext);

    return  user && user?.role === ADMIN_ROLE ?  children : (<Navigate to="/auth/user/questions" replace />)

}

