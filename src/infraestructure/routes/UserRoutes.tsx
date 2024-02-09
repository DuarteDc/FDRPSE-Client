import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../app/pages';
import { UserQuestion } from '../../app/pages/user-questions/UserQuestion';
import { SuccessAnswer } from '../../app/pages/user-questions/SuccessAnswer.server';
import { CanAnswerQuestions } from '../middlewares/user/CanAnswerQuestions';

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
            <Route path="/no-available" element={<h1>xD</h1>} />
        </Routes>
    )
}
