import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';


interface Props {
    children   : ReactNode | Array<ReactNode>
}

const USER_ROLE = "1";

export const UserRoleRoutes = ({ children }: Props) => {

    const { user } = useContext(AuthContext);

    return user && user?.role === USER_ROLE ?  children : (<Navigate to="/auth/" replace />)

}
