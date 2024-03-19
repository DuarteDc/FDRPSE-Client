import { Route, Routes } from 'react-router-dom';
import { CreateDimensionPage, DimensionsPage } from '../../app/pages';

const DimensionRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<DimensionsPage />} />
            <Route path="/create" element={<CreateDimensionPage />} />
        </Routes>
    )
}


export default DimensionRoutes;