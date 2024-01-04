import { PageLayout } from '../../../infraestructure/components/ui';
import { FormDimension } from '../../../infraestructure/components/dimensions';

export const CreateDimensionPage = () => {
    return (
        <PageLayout title="Crear dimensión" navigateTo="/admin/dimensions">
            <div className="grid grid-cols-2 mt-20">
                <FormDimension />
                <div className="flex justify-center">
                    <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
                </div>
            </div>
        </PageLayout>
    )
}
