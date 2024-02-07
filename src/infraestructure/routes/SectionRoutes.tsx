import { Route, Routes } from 'react-router-dom';
import { SectionPage } from '../../app/pages/sections';

export const SectionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SectionPage />} />
            <Route path="create" element={<h2>Create</h2>} />
            <Route path="show/:id" element={<h3>show</h3>} />
        </Routes>
    )
}
