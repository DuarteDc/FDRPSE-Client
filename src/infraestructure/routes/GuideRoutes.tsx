import { Route, Routes } from 'react-router-dom';
import { CreateGuidePage, GuidesPage, ShowGuidePage } from '../../app/pages/guides';


export const GuideRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<GuidesPage />} />
            <Route path="/create" element={<CreateGuidePage />} />
            <Route path="/show/:id" element={<ShowGuidePage />} />
        </Routes>
    )
}
