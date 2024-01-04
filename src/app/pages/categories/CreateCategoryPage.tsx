import { PageLayout } from '../../../infraestructure/components/ui';
import { FormCategory } from '../../../infraestructure/components/categories';

export const CreateCategoryPage = () => {
  return (
    <PageLayout title="Crear categoría" navigateTo="/admin/categories">
      <div className="grid grid-cols-2 mt-20">
        <FormCategory />
        <div className="flex justify-center">
          <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
        </div>
      </div>

    </PageLayout>
  )
}
