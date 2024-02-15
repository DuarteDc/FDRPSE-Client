import { PageLayout } from '../../../infraestructure/components/ui';
import { FormCategory } from '../../../infraestructure/components/categories';

export const CreateCategoryPage = () => {
  return (
    <PageLayout title="Crear categoría" navigateTo="/auth/categories">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 mt-20">
        <FormCategory />
        <div className="lg:flex justify-center hidden">
          <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
        </div>
      </div>

    </PageLayout>
  )
}
