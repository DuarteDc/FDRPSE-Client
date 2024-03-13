import { ForwardedRef, Fragment, forwardRef, useEffect, useImperativeHandle } from 'react';
import { ValidateStep } from '../../../app/utils/guideSteps';
import { sectionService } from '../../../domain/services/section.service';
import { parseSectionDataToIds } from '../../../app/helpers/parseSectionDataToIds';
import { DotsVertical, EyeIcon, InfoCircle, SectionIcon, XIcon } from '../icons';
import { Question, SectionQuesions } from '../../../domain/models';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { Modal } from '../ui/Modal';
import { AnswerQuestionForm } from '../questions/AnswerQuestionForm';
import { guideService } from '../../../domain/services/guide.service';

export const PreviewNewGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { guide } = guideService();
    const { sectionsSelected, getSectionsDetailWithQuestions, sections, section, findCurrentSection } = sectionService({ onOpenAuxiliarModel: onOpen });

    useEffect(() => {
        getSectionsDetailWithQuestions(parseSectionDataToIds(sectionsSelected!));
    }, []);

    useImperativeHandle(ref, () => ({
        canContinue: () => false
    }));

    console.log(!!!!guide?.gradable)

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <SectionIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Vista previa del cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí podras ver un vista previa de como se mostrará el cuestionario</p>
            </span>
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                size="4xl"
                hideCloseButton
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h5>Vista previa de la sección</h5>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <span className="text-xs font-bold text-gray-500 mb-2">
                            Aquí se muesta una visualización de como será mostrada la sección a los usuarios
                        </span>
                        <span className="flex items-center -mb-2">
                            <p className="font-bold text-sm">{section?.name}</p>
                        </span>
                        <AnswerQuestionForm
                            hasSubquestions={section?.question}
                            questions={section.questions!}
                            showFooterControls={false}
                        />
                    </Fragment>
                )}
            />
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Nombre del cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-4 uppercase">{guide?.name}</p>
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Tipo de cuestionario:</p>
                </span>

                {
                    guide!.gradable ? (
                        <span className="border-2 border-yellow-500/50 w-full block rounded-lg py-2 bg-yellow-500/10">
                            <p className="font-bold text-sm pl-4 flex items-center [&>svg]:text-yellow-500 [&>svg]:mr-1">
                                <InfoCircle strokeWidth={2} />
                                xd</p>
                            <p className="text-gray-500 font-bold text-xs pl-4">El cuestionario no genera valores con valores para calificar</p>
                        </span>
                    ) : (
                        <span className="border-2 border-yellow-500/50 w-full block rounded-lg py-2 bg-yellow-500/10">
                            <p className="font-bold text-sm pl-4 flex items-center [&>svg]:text-yellow-500 [&>svg]:mr-1">
                                <InfoCircle strokeWidth={2} />
                                Cuestionario Informativo</p>
                            <p className="text-gray-500 font-bold text-xs pl-4">El cuestionario no genera valores con valores para calificar</p>
                        </span>
                    )
                }
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold mb-4">Resumen del cuestionario:</p>
                </span>
                {
                    sections.map((section) => (
                        <div key={section.id} className="border-2 mb-2 rounded-lg flex justify-between pr-5 items-center pb-2 hover:border-emerald-600 cursor-pointer transition-all duration-400">
                            <div>
                                <p className="font-bold text-xs pl-5 mt-2 flex items-center [&>svg]:text-emerald-600 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-2 [&>svg]:mr-2">
                                    <SectionIcon width={40} height={40} strokeWidth={2.5} />
                                    {section.name}
                                </p>
                                {
                                    section.binary && (
                                        <p className="text-gray-500 font-bold text-xs pl-20 mb-4">{section.question}</p>
                                    )
                                }
                                {
                                    section?.questions?.map((question: Question) => (
                                        <p className="text-gray-500 font-bold pl-24 text-xs" key={question.id}>{question.name}</p>
                                    ))
                                }
                            </div>
                            <span className="flex items-center [&>svg]:hover:text-emerald-600">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="bg-transparent max-w-1 px-0 border-2" isIconOnly>
                                            <DotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                        <DropdownItem
                                            key="new"
                                            onClick={() => { onOpen(); findCurrentSection(section as SectionQuesions) }}
                                            className="font-bold"
                                            title="Vista previa"
                                            description="Vista previa de lo que el usuario verá"
                                            startContent={
                                                <span className="bg-emerald-600/80 rounded-lg p-2 text-white">
                                                    <EyeIcon />
                                                </span>
                                            }
                                        >
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </span>
                        </div>
                    ))
                }
            </span>
        </section>
    )
})
