import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../app/pages/auth/LoginPage';
import { AuthRoutes, PublicRoutes } from './';
import { HomePage } from '../../app/pages/user/HomePage';
import { Layout } from '../components/ui';


export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PublicRoutes>
                    <Routes>
                        <Route path="*" element={<LoginPage />} />
                    </Routes>
                </PublicRoutes>
            } />
            <Route
                path="/auth/*" element={
                    <AuthRoutes>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                            </Routes>
                        </Layout>
                    </AuthRoutes>
                }
            />
        </Routes>
    )
}
