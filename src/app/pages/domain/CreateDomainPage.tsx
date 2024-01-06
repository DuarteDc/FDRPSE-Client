import { FormDomain } from '../../../infraestructure/components/domains';
import { PageLayout } from '../../../infraestructure/components/ui';


export const CreateDomainPage = () => {
  return (
    <PageLayout title="Crear dominio" navigateTo="/admin/domains">
        <div className="grid grid-cols-2">
          <FormDomain />
          <div className="flex justify-center">
            <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
          </div>
        </div>
    </PageLayout>
  )
}
