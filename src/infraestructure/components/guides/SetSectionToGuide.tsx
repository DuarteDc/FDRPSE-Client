import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react'
import { ValidateStep } from '../../../app/utils/guideSteps'
import { sectionService } from '../../../domain/services/section.service';
import { SectionList } from '../sections/SectionList';
import { SectionCard } from '../sections';
import { useDisclosure } from '@nextui-org/react';
import { Modal } from '../ui/Modal';
import { SectionIcon } from '../icons';
import { useGuide } from '../../../app/hooks/useGuide';
import { OnDropSections, SectionDetail } from './';
import { guideService } from '../../../domain/services/guide.service';


export const SetSectionToGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { guide } = guideService();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { onDragStart, onDragEnd, allowDrop, onDropSection, isDrag, handleRemoveSectionSelected } = useGuide();
    const { startGetSectionsBy, sections, loading, getSectionDetail, section, sectionsSelected  } = sectionService({ onOpenAuxiliarModel: onOpen });

    useEffect(() => {
        startGetSectionsBy(String(guide!.gradable) === 'true' ? 'gradable' : 'nongradabale')
    }, []); 
    
    useImperativeHandle(ref, () => ({
        canContinue: () => sectionsSelected.length > 0,
    }));

    return (
        <section className="grid grid-cols-7">
            <Modal
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
            <OnDropSections 
                isDrag={isDrag}
                sections={sectionsSelected}
                getSectionDetail={getSectionDetail}
                handelRemoveSection={handleRemoveSectionSelected}
                allowDrop={allowDrop}
                onDrop={onDropSection}
                    
            />
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
                            classList="border-2 flex items-center my-1 rounded-lg mx-2 text-xs cursor-pointer overflow-hidden hover:border-emerald-600 transition-all duration-400 py-3 px-2 [&>div>h2]:text-xs"
                        />
                    }
                />
            </div>
        </section>
    );



})
