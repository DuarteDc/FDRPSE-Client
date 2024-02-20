import { FormDomain } from '../../../infraestructure/components/domains';
import { PageLayout } from '../../../infraestructure/components/ui';


export const CreateDomainPage = () => {
  return (
    <PageLayout title="Crear dominio" navigateTo="/auth/domains">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10">
          <FormDomain />
          <div className="lg:flex justify-center hidden">
            <img src="/cuestionario/public/assets/form.svg" alt="form-icon" width={600} height={300} />
          </div>
        </div>
    </PageLayout>
  )
}
