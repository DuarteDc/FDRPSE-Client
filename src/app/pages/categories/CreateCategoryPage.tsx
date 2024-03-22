import { PageLayout } from '../../../infraestructure/components/ui';
import { FormCategory } from '../../../infraestructure/components/categories';
import { CategoryIcon } from '../../../infraestructure/components/icons';

export const CreateCategoryPage = () => {
  return (
    <PageLayout title="Crear categoría">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 mt-20">
        <span className="mb-5 block col-span-7">
          <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
            <CategoryIcon width={35} height={35} strokeWidth={1.5} />
            <p className="font-bold">Datos Generales</p>
          </span>
          <p className="text-gray-500 font-bold text-xs pl-10">Asigna los valores con los cuales se va a calificar la categoría</p>
        </span>
        <FormCategory />
        <div className="lg:flex justify-center hidden">
          <img src="/cuestionario/public/assets/form.svg" alt="form-icon" width={600} height={300} />
        </div>
      </div>

    </PageLayout>
  )
}
