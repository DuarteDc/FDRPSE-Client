import { Route, Routes } from 'react-router-dom';
import { QuestionsPage, ShowQuestionPage } from '../../app/pages';

export const QuestionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<QuestionsPage />} />
            <Route path="show/:id" element={<ShowQuestionPage />} />
        </Routes>
    )
}

