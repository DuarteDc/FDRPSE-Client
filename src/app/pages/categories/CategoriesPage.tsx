import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageLayout } from '../../../infraestructure/components/ui'
import { CategoriesList } from '../../../infraestructure/components/categories/CategoriesList';

import { categoriesService } from '../../../domain/services/categories.service'

export const CategoriesPage = () => {

  const navigate = useNavigate();

  const { startGetCategories, categories, loading } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);

  return (
    <PageLayout title="Categorías" navigateTo="/auth">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
        <CategoriesList
          categories={categories}
          loading={loading}
          navigate={navigate}
        />
      </div>
    </PageLayout>
  )
}
