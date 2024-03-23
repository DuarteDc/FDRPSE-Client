import { useEffect } from 'react';

import CardList from '../../../infraestructure/components/ui/CardList';
import { PageLayout } from '../../../infraestructure/components/ui'
import { categoriesService } from '../../../domain/services/categories.service'
import { CategoryIcon, PlusIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';

export const CategoriesPage = () => {

  const { navigate } = useNavigation();

  const { startGetCategories, categories, loading } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);

  return (
    <PageLayout title="Categorías">
      <span className="mb-5 block col-span-3">
        <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
          <CategoryIcon width={35} height={35} strokeWidth={1.5} />
          <p className="font-bold">Lista de categorías</p>
        </span>
        <p className="text-gray-500 font-bold text-xs pl-10">Las categorias son utiles para cuestionarios que cuentan con una calificación</p>
      </span>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
        <CardList data={categories} loading={loading}>
          <CardList.CreateItem
            title="Crear categoría"
            image={<PlusIcon />}
            onPress={() => navigate('create')}
          />
        </CardList>
      </div>
    </PageLayout>
  )
}
