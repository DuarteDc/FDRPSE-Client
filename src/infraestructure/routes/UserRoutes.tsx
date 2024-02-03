import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../app/pages';
import { UserQuestion } from '../../app/pages/user-questions/UserQuestion';
import { SuccessAnswer } from '../../app/pages/user-questions/SuccessAnswer';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/questions" element={<UserQuestion />} />
            <Route path="/questions/success-answer" element={<SuccessAnswer />} />
        </Routes>
    )
}
