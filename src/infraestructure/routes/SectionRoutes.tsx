import { Route, Routes } from 'react-router-dom';
import { SectionPage } from '../../app/pages/sections';

export const SectionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SectionPage />} />
        </Routes>
    )
}
