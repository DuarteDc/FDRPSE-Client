import { Route, Routes } from 'react-router-dom'
import { SurveyPage, ShowSurveyPage } from '../../app/pages/surveys'

export const SurveyRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SurveyPage />} />
            <Route path="show/:id" element={<ShowSurveyPage />} />
        </Routes>
    )
}
