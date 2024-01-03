import { Route, Routes } from 'react-router-dom';

import { AuthRoutes, CategoryRoutes, PublicRoutes } from './';
import { Layout } from '../components/ui';
import { LoginPage, HomePage, QuestionsPage, } from '../../app/pages/';
import { CategoryProvider } from '../context/category';
import { SectionProvider } from '../context/section';


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
                                        <SectionProvider>
                                            <Routes>CategoriesPage
                                                <Route path="/categories/*" index element={<CategoryRoutes />} />
                                            </Routes>
                                        </SectionProvider>
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
