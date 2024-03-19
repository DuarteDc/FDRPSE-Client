import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdminRoutes, AuthRoutes, GuideRoutes, PublicRoutes, QuestionRoutes, SectionRoutes, SurveyRoutes, UserRoutes } from './';
import { Layout } from '../components/ui';
import { LoginPage, NotFound, } from '../../app/pages/';
import { CategoryProvider } from '../context/category';
import { SectionProvider } from '../context/section';
import { DomainProvider } from '../context/domain';
import { DimensionProvider } from '../context/dimension';
import { QuestionProvider } from '../context/questions';
import { QualificationProvider } from '../context/qualification';
import SurveyProvider from '../context/survey/SurveyProvider';
import { AreaProvider } from '../context/area';
import { GuideProvider } from '../context/guide';

const CategoryRoutes = lazy(() => import('./CategoryRoutes'));
const DimensionRoutes = lazy(() => import('./DimensionRoutes'));
const DomainRoutes = lazy(() => import('./DomainRoutes'));

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={
                <PublicRoutes>
                    <Routes>
                        <Route path="/" index element={<LoginPage />} />
                        <Route path="*" element={<NotFound />} />
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
                                                                    <AreaProvider>
                                                                        <GuideProvider>
                                                                            <Routes>
                                                                                <Route path="/*" index element={<SurveyRoutes />} />
                                                                                <Route path="surveys/*" index element={<GuideRoutes />} />
                                                                                <Route path="questions/*" index element={<QuestionRoutes />} />
                                                                                <Route path="sections/*" index element={<SectionRoutes />} />
                                                                                <Route path="categories/*" index element={<CategoryRoutes />} />
                                                                                <Route path="domains/*" index element={<DomainRoutes />} />
                                                                                <Route path="dimensions/*" index element={<DimensionRoutes />} />
                                                                                <Route path="*" element={<NotFound />} />
                                                                            </Routes>
                                                                        </GuideProvider>
                                                                    </AreaProvider>
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
                                                <Route path="/*" element={<NotFound />} />
                                            </Routes>
                                        </SurveyProvider>
                                    </QuestionProvider>
                                } />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Layout>
                    </AuthRoutes>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
