import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CardList from '../../../infraestructure/components/ui/CardList';
import {PageLayout } from '../../../infraestructure/components/ui'
import { categoriesService } from '../../../domain/services/categories.service'
import { PlusIcon } from '../../../infraestructure/components/icons';

export const CategoriesPage = () => {

  const navigate = useNavigate();

  const { startGetCategories, categories, loading } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);

  return (
    <PageLayout title="Categorías" navigateTo="/admin">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
        <CardList data={categories} loading={loading}>
          <CardList.CreateItem title="Crear categoría" image={<PlusIcon />} onPress={()=> navigate('/admin/categories/create')}/> 
        </CardList>
      </div>
    </PageLayout>
  )
}
