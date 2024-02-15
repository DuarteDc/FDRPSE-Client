import { Route, Routes } from 'react-router-dom';

import { AdminRoutes, AuthRoutes, CategoryRoutes, DimensionRoutes, DomainRoutes, PublicRoutes, QuestionRoutes, SectionRoutes, SurveyRoutes, UserRoutes } from './';
import { Layout } from '../components/ui';
import { HomeAdminPage, LoginPage, } from '../../app/pages/';
import { CategoryProvider } from '../context/category';
import { SectionProvider } from '../context/section';
import { DomainProvider } from '../context/domain';
import { DimensionProvider } from '../context/dimension';
import { QuestionProvider } from '../context/questions';
import { QualificationProvider } from '../context/qualification';
import SurveyProvider from '../context/survey/SurveyProvider';

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
                                <Route path="/*" element={
                                    <AdminRoutes>
                                        <CategoryProvider>
                                            <SectionProvider>
                                                <DomainProvider>
                                                    <DimensionProvider>
                                                        <QuestionProvider>
                                                            <QualificationProvider>
                                                                <SurveyProvider>
                                                                    <Routes>
                                                                        <Route path="/" index element={<HomeAdminPage />} />
                                                                        <Route path="surveys/*" index element={<SurveyRoutes />} />
                                                                        <Route path="sections/*" index element={<SectionRoutes />} />
                                                                        <Route path="/categories/*" index element={<CategoryRoutes />} />
                                                                        <Route path="/domains/*" index element={<DomainRoutes />} />
                                                                        <Route path="/dimensions/*" index element={<DimensionRoutes />} />
                                                                        <Route path="/questions/*" index element={<QuestionRoutes />} />
                                                                    </Routes>
                                                                </SurveyProvider>
                                                            </QualificationProvider>
                                                        </QuestionProvider>
                                                    </DimensionProvider>
                                                </DomainProvider>
                                            </SectionProvider>
                                        </CategoryProvider>
                                    </AdminRoutes>
                                } />
                                <Route path="/user/*" element={
                                    <QuestionProvider>
                                        <SurveyProvider>
                                            <Routes>
                                                <Route path="questions/*" index element={<UserRoutes />} />
                                            </Routes>
                                        </SurveyProvider>
                                    </QuestionProvider>
                                } />
                            </Routes>
                        </Layout>
                    </AuthRoutes>
                }
            />
        </Routes>
    )
}
