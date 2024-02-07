import { Route, Routes } from 'react-router-dom';

import { AuthRoutes, CategoryRoutes, DimensionRoutes, DomainRoutes, PublicRoutes, QuestionRoutes, SectionRoutes, UserRoutes } from './';
import { Layout } from '../components/ui';
import { HomePage, LoginPage, } from '../../app/pages/';
import { CategoryProvider } from '../context/category';
import { SectionProvider } from '../context/section';
import { DomainProvider } from '../context/domain';
import { DimensionProvider } from '../context/dimension';
import { QuestionProvider } from '../context/questions';
import { QualificationProvider } from '../context/qualification';
import { UserQuestion } from '../../app/pages/user-questions/UserQuestion';


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
                                                    <QuestionProvider>
                                                        <QualificationProvider>
                                                            <Routes>
                                                                <Route path="/" index element={<h1>xd</h1>} />
                                                                <Route path="sections/*" index element={<SectionRoutes />} />
                                                                <Route path="/categories/*" index element={<CategoryRoutes />} />
                                                                <Route path="/domains/*" index element={<DomainRoutes />} />
                                                                <Route path="/dimensions/*" index element={<DimensionRoutes />} />
                                                                <Route path="/questions/*" index element={<QuestionRoutes />} />
                                                                <Route path="user-questions/*" index element={<UserRoutes />} />
                                                            </Routes>
                                                        </QualificationProvider>
                                                    </QuestionProvider>
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
