import { Route, Routes } from 'react-router-dom';
import { CreateDimensionPage, DimensionsPage } from '../../app/pages';

export const DimensionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<DimensionsPage />} />
            <Route path="/create" element={<CreateDimensionPage />} />
        </Routes>
    )
}
