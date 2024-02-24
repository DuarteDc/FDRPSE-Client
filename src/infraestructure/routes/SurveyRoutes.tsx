import { Route, Routes } from 'react-router-dom'
import { SurveyPage,StartNewSurvey, ShowSurveyPage } from '../../app/pages/surveys'

export const SurveyRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SurveyPage />} />
            <Route path="start" index element={<StartNewSurvey />} />
            <Route path="show/:id" element={<ShowSurveyPage />} />
        </Routes>
    )
}
