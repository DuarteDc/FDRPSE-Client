import { Route, Routes } from 'react-router-dom';

import { AuthRoutes, PublicRoutes } from './';
import { Layout } from '../components/ui';
import { LoginPage, HomePage, QuestionsPage, HomeAdminPage, CategoriesPage } from '../../app/pages/';
import { CategoryProvider } from '../context/category';


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
                                <Route path="/" index element={<HomePage />} />
                                <Route path="questions" element={<QuestionsPage />} />
                                <Route path="admin/*" element={
                                    <CategoryProvider>
                                        <Routes>
                                            <Route path="/" index element={<CategoriesPage />} />
                                        </Routes>
                                    </CategoryProvider>
                                } />
                            </Routes>
                        </Layout>
                    </AuthRoutes>
                }
            />
        </Routes>
    )
}
