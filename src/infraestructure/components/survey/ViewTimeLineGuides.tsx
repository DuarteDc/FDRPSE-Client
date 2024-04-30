import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';

import { ValidateStep } from '../../../app/utils/surveySteps';
import { guideService } from '../../../domain/services/guide.service';
import { FileDescription, TimeLine } from '../icons';
import { Chip } from '@nextui-org/react';
import { warningAlert } from '../../alert/alerts';
import { surveyService } from '../../../domain/services/survey.service';
import { parseSelecteGuidesToCreateSurvey } from '../../../app/helpers/parseSelecteGuidesToCreateSurvey';

export const ViewTimeLineGuides = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { guidesSelected } = guideService();
    const { startNewSurvey } = surveyService();

    const canContinue = async () => {
        if (!guidesSelected.length) {
            warningAlert('Debes seleccionar al menos una guía para poder continuar');
            return false;
        }
        await startNewSurvey(parseSelecteGuidesToCreateSurvey(guidesSelected))
        return true;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }))

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <TimeLine width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Orden de aplicación</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Los cuestionarios estaran disponibles en el orden que se muetran.</p>
            </span>
            <div className="w-full relative after:w-2 after:bg-emerald-600 after:rounded-full after:left-0 after:right-0 after:m-auto after:absolute
        after:min-h-fit after:h-full after:top-0 after:bottom-0 animate-[fadeIn_0.5s] overflow-hidden transition-all duration-1000">
                {
                    guidesSelected.map((guide, index) => (
                        <div key={guide.id} data-position={(index + 1)} className={`border-2 p-4 rounded-lg mx-2 w-[calc(50%-40px)] ${index % 2 === 0 ? ' float-left clear-right before:-right-2 before:rotate-180 after:-right-11' : ' float-right clear-left before:-left-2 after:-left-11'}
                        shadow-xl shadow-emerald-600/10
                        hover:border-emerald-600 transition-all duration-500 cursor-pointer text-xs relative
                        before:w-0 before:h-0 before:border-y-8 before:border-y-solid before:border-y-transparent before:absolute before:z-20
                        before:border-r-8 before:border-r-solid before:hover:border-r-emerald-600 before:top-0 before:bottom-0 before:my-auto
                        before:transition-all before:duration-500
                        after:h-5 after:w-5 after:absolute after:bg-emerald-500 after:content-[attr(data-position)] after:text-white after:font-extrabold
                        after:flex after:items-center after:justify-center after:my-auto after:top-0 after:bottom-0 after:rounded-full
                        after:z-20 after:hover:bg-emerald-400 after:transition-all after:duration-500 [&>span>p>svg]:text-emerald-600
                        group group-hover:transition-all group-hover:duration-400 animate-[fadeIn_0.5s]
                    `}>
                            <div className="flex justify-between">
                                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                                    <FileDescription width={35} height={35} strokeWidth={1.5} />
                                    <p className="text-xs lg:text-lg bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 text-transparent bg-clip-text font-bold">
                                        {guide.name}
                                    </p>
                                </span>
                                <Chip variant="bordered" size="sm" color={guide.gradable ? 'success' : 'primary'}>
                                    {guide.gradable ? 'Evaluativo' : 'Informativo'}
                                </Chip>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
})
