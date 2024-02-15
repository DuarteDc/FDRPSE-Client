import { Route, Routes } from 'react-router-dom';
import { CanAnswerQuestions } from '../middlewares/user/CanAnswerQuestions';
import { HomePage } from '../../app/pages';
import { NoAvailableSurveys, SuccessAnswer, UserQuestion } from '../../app/pages/user-questions';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/*" index element={
                <CanAnswerQuestions>
                    <Routes>
                        <Route path="/" index element={<HomePage />} />
                        <Route path="/questions" element={<UserQuestion />} />
                        <Route path="/questions/success-answer" element={<SuccessAnswer />} />
                    </Routes>
                </CanAnswerQuestions>
            } />
            <Route path="/no-available" element={<NoAvailableSurveys />} />
        </Routes>
    )
}
