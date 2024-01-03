import { Route, Routes } from 'react-router-dom';

import { CategoriesPage, CreateCategoryPage } from '../../app/pages';
import { CategoryProvider } from '../context/category';

export const CategoryRoutes = () => {
  return (
    <CategoryProvider>
      <Routes>
        <Route path="/" index element={<CategoriesPage />} />
        <Route path="/create" element={<CreateCategoryPage />} />
      </Routes>
    </CategoryProvider>
  )
}
