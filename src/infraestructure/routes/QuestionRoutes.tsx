import { Route, Routes } from 'react-router-dom';
import { CreateQuestionPage, QuestionsPage, ShowQuestionPage } from '../../app/pages';

export const QuestionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<QuestionsPage />} />
            <Route path="create" element={<CreateQuestionPage />} />
            <Route path="show/:id" element={<ShowQuestionPage />} />
        </Routes>
    )
}

