import { Route, Routes } from 'react-router-dom';
import { CreateGuidePage, GuidesPage } from '../../app/pages/guides';


export const GuideRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<GuidesPage />} />
            <Route path="/create" element={<CreateGuidePage />} />
        </Routes>
    )
}
