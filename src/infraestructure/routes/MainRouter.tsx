import { Route, Routes } from 'react-router-dom';

import { AuthRoutes, CategoryRoutes, DimensionRoutes, DomainRoutes, PublicRoutes } from './';
import { Layout } from '../components/ui';
import { LoginPage, } from '../../app/pages/';
import { CategoryProvider } from '../context/category';
import { SectionProvider } from '../context/section';
import { DomainProvider } from '../context/domain';
import { DimensionProvider } from '../context/dimension';


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
                path="/admin/*" element={
                    <AuthRoutes>
                        <Layout>
                            <Routes>
                                <Route path="*" element={
                                    <CategoryProvider>
                                        <SectionProvider>
                                            <DomainProvider>
                                                <DimensionProvider>
                                                    <Routes>
                                                        <Route path="/" index element={<h1>xd</h1>} />
                                                        <Route path="/categories/*" index element={<CategoryRoutes />} />
                                                        <Route path="/domains/*" index element={<DomainRoutes />} />
                                                        <Route path="/dimensions/*" index element={<DimensionRoutes />} />
                                                    </Routes>
                                                </DimensionProvider>
                                            </DomainProvider>
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
