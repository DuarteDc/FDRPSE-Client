import { PageLayout } from '../../../infraestructure/components/ui';
import { FormDimension } from '../../../infraestructure/components/dimensions';

export const CreateDimensionPage = () => {
    return (
        <PageLayout title="Crear dimensión">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 mt-20">
                <FormDimension />
                <div className="lg:flex justify-center hidden">
                    <img src="/cuestionario/public/assets/form.svg" alt="form-icon" width={600} height={300} />
                </div>
            </div>
        </PageLayout>
    )
}
