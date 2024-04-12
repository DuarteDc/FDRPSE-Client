import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react'
import { ValidateStep } from '../../../app/utils/dateTimeSteps'
import { guideService } from '../../../domain/services/guide.service';
import { FileDescription } from '../icons';
import { GuideList, OnDropGuides } from '../guides';
import { useSurvey } from '../../../app/hooks/useSurvey';
import { warningAlert } from '../../alert/alerts';

export const ViewSelectedGuides = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { startGetGuides, guides, loading, guidesSelected } = guideService();
    const { onDragStart, onDragEnd, allowDrop, onDropGuide, isDrag, handleRemoveGuideSelected } = useSurvey();

    useEffect(() => {
        startGetGuides('');
    }, []);


    const canContinue = async() => {
        if (!guidesSelected.length) {
            warningAlert('Debes seleccionar al menos una guía para poder continuar');
            return false;
        }
        return true;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }))

    return (
        <section className="grid grid-cols-7 animate-[fadeIn_0.5s]">
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <FileDescription width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Asigna las guias que los usuarios responderan</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Arrastra las secciones que deseas que contenga el cuestionario </p>
            </span>
            <OnDropGuides
                isDrag={isDrag}
                guides={guidesSelected}
                handelRemoveGuide={handleRemoveGuideSelected}
                allowDrop={allowDrop}
                onDrop={onDropGuide}

            />
            <div className="col-span-2 pl-2">
                <span className="mb-6 block">
                    <p className="font-bold">Lista de guias</p>
                    <p className="text-gray-500 font-bold text-xs pl-4">Las guias se mostrarán a los usuarios en el orden que sen agregadas</p>
                </span>
                <GuideList
                    guides={guides}
                    loading={loading}
                    draggable={true}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                />

            </div>
        </section>
    )
})
