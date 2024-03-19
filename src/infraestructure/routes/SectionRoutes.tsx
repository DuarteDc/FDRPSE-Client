import { Route, Routes } from 'react-router-dom';
import { SectionPage, ShowSectionPage } from '../../app/pages/sections';

export const SectionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SectionPage />} />
            <Route path=":id" index element={<ShowSectionPage />} />
        </Routes>
    )
}
