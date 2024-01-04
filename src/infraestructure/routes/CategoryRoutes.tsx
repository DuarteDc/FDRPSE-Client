import { Route, Routes } from 'react-router-dom';
import { CategoriesPage, CreateCategoryPage } from '../../app/pages';

export const CategoryRoutes = () => {
  return (
      <Routes>
        <Route path="/" index element={<CategoriesPage />} />
        <Route path="/create" element={<CreateCategoryPage />} />
      </Routes>
  )
}
