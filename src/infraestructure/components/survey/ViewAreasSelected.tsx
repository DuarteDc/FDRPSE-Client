import { ForwardedRef, forwardRef, useEffect } from 'react'
import { ValidateStep } from '../../../app/utils/dateTimeSteps'
import { guideService } from '../../../domain/services/guide.service';
import { GuideList } from '../guides';
import { FileDescription } from '../icons';

export const ViewAreasSelected = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { startGetGuides, guides, loading } = guideService();

    useEffect(() => {
        startGetGuides('');
    }, []);

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <FileDescription width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Cuestionarios disponibles</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí se muestran los cuestionarios que serán aplicados a los usuarios</p>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <GuideList
                    guides={guides}
                    loading={loading}
                />
            </div>
        </section>
    )
})
