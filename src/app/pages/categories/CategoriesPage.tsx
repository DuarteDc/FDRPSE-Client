import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesService } from '../../../domain/services/categories.service'
import { Card, PageLayout } from '../../../infraestructure/components/ui'
import { SkeletonCard } from '../../../infraestructure/components/ui/skeleton';
import { ArrowNarrowLeft } from '../../../infraestructure/components/icons';

export const CategoriesPage = () => {

  const { categories, startGetCategories, loading } = categoriesService();
  const navigate = useNavigate();

  useEffect(() => {
    startGetCategories();
  }, []);

  return (
    <PageLayout title="Categorías" navigateTo="/">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-16 my-4 lg:mt-20">
        {
          loading ?
            <SkeletonCard /> :
            categories?.map(({ id, name }) => (
              <Card title={name} key={id} />
            ))
        }
      </div>
      </PageLayout>
  )
}
