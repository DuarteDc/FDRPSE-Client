import { ForwardedRef, Fragment, forwardRef, useEffect, useImperativeHandle } from "react"
import { ValidateStep } from "../../../app/utils/guideSteps"
import { sectionService } from "../../../domain/services/section.service";
import { SectionList } from "../sections/SectionList";
import { SectionCard } from '../sections';
import { useDisclosure } from '@nextui-org/react';
import { Modal } from '../ui/Modal';
import { SectionIcon, XIcon } from '../icons';
import { useGuide } from '../../../app/hooks/useGuide';
import { SectionDetail } from './';
import { guideService } from "../../../domain/services/guide.service";


export const SetSectionToGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { onDragStart, onDragEnd, allowDrop, onDropArea, isDrag, handleRemoveSectionSelected } = useGuide({});
    const { startGetSectionsBy, sections, loading, getSectionDetail, section, sectionsSelected } = sectionService({ onOpenAuxiliarModel: onOpen });
    const { guide } = guideService();

    useEffect(() => {
        startGetSectionsBy(guide!.gradable)
    }, []); 

    useImperativeHandle(ref, () => ({
        canContinue: () => true,
    }));

    return (
        <section className="grid grid-cols-7">
            <Modal
                title=""
                isOpen={isOpen}
                onChange={onOpenChange}
                size="3xl"
                hideCloseButton
                renderContent={(onClose) => (
                    <SectionDetail
                        loading={loading}
                        section={section!}
                        onClose={onClose}
                    />
                )}
            />
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <SectionIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Asignar Secciones</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Arrastra las secciones que deseas que contenga el cuestionario </p>
            </span>
            <div className={`min-h-[500px] col-span-5 w-full border-2 transition-all duration-400 rounded-xl flex flex-wrap p-2 gap-2 mt-16 ${isDrag ? 'bg-gray-200 border-dashed border-gray-400 ease-in' : 'opacity-100 ease-in-out'}`}
                onDrop={onDropArea}
                onDragOver={allowDrop}
            >
                {
                    sectionsSelected.map((section) => (
                        <SectionCard
                            classList="py-5 cursor-pointer flex items-center border-2 md:w-[calc(50%-5px)] xl:w-[calc(33%-5px)] h-[7rem] rounded-lg hover:border-emerald-600 transition-all duration-400
                            shadow-md shadow-emerald-600/10 relative px-3"
                            key={section.id}
                            section={section}
                            draggable={false}
                            renderContent={() => (
                                <span className="absolute top-1 right-1 rounded-full border-2 p-1 hover:border-danger hover:text-danger transition-all duration-400 z-10"
                                    onClick={() => handleRemoveSectionSelected(section)}
                                >
                                    <XIcon height={15} width={15} strokeWidth={3} />
                                </span>
                            )}
                        />
                    ))
                }
            </div>
            <div className="col-span-2">
                <span className="mb-6 block">
                    <p className="font-bold">Lista de Secciones</p>
                    <p className="text-gray-500 font-bold text-xs pl-4">Las secciones se mostraran en el orden que sen agregadas</p>
                </span>
                <SectionList
                    sections={sections}
                    loading={loading}
                    className="w-full px-0 col-span-2 [&>div>div]:hover:scale-100 [&>div>div]:my-2"
                    renderChilds={({ section }) =>
                        <SectionCard
                            draggable={true}
                            section={section}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            handleSelectSection={getSectionDetail}
                            showControlls
                            classList="border-2 flex items-center my-1 rounded-lg mx-2 text-xs cursor-pointer overflow-hidden hover:border-emerald-600 transition-all duration-400 py-3 px-2
                                [&>div>h2]:text-xs
                            "
                        />
                    }
                />
            </div>
        </section>
    );



})
