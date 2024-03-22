import { useEffect } from 'react';

import CardList from '../../../infraestructure/components/ui/CardList';
import { PageLayout } from '../../../infraestructure/components/ui'
import { categoriesService } from '../../../domain/services/categories.service'
import { PlusIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';

export const CategoriesPage = () => {

  const { navigate } = useNavigation();

  const { startGetCategories, categories, loading } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);

  return (
    <PageLayout title="Categorías">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
        <CardList data={categories} loading={loading}>
          <CardList.CreateItem title="Crear categoría" image={<PlusIcon />} onPress={() => navigate('create')} />
        </CardList>
      </div>
    </PageLayout>
  )
}
