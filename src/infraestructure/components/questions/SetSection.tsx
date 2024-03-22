import { ForwardedRef, Fragment, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Badge, Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { CheckIcon, QuestionIcon, SectionIcon, XIcon } from '../icons';

import { Modal } from '../ui/Modal';
import { useQuestion } from '../../../app/hooks/useQuestion';
import type { ValidateStep, Props as PropsComponent } from '../../../app/utils/questionSteps';
import { SectionCard } from '../sections';
import { SectionList } from '../sections/SectionList';
import { sectionService } from '../../../domain/services/section.service';


export const SetSection = forwardRef<PropsComponent & ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setSectionBeforeSave, question: currentQuestion } = useQuestion();

    const { startGetSectionsBy, sections } = sectionService({});

    useEffect(() => {
        startGetSectionsBy(currentQuestion!.type);
    }, []);

    const canContinue = () => {
        if (!currentQuestion?.section) {
            onOpen()
            return false;
        }
        return true;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }))

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <SectionIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Asignar sección</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Asigna la sección que agrupará a la pregunta</p>
            </span>

            <div className="flex justify-end">
                <Tooltip content="Haz clic para abrir el panel de sección y establece una" color="foreground">
                    <Button isIconOnly className="bg-slate-800 text-white" onClick={onOpen}>
                        <SectionIcon strokeWidth={2} />
                    </Button>
                </Tooltip>
            </div>
            <div className="mt-5">
                <h2 className="font-bold text-xl">Sección actual:</h2>
                <div className="flex items-center [&>svg]:mr-2 relative my-2 shadow-lg py-6 rounded-lg w-full min-h-[8rem]">
                    <span className="absolute -left-3 w-14 h-10 bg-emerald-600 inset-y-1/3 shadow-xl flex items-center justify-center text-white rounded-lg"><QuestionIcon /></span>
                    <div className="flex flex-col justify-center ml-14 w-full">
                        <h3 className="font-bold">{currentQuestion?.section?.name}</h3>
                        {
                            currentQuestion?.section?.binary && (
                                <>
                                    <span>{currentQuestion?.section?.question}:</span> <span className="text-sm">Si / No</span>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                size="full"
                hideCloseButton
                renderContent={(onClose) =>
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h1>Asignar Seccion</h1>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <SectionList
                            sections={sections}
                            loading={false}
                            renderChilds={({ section }) => (
                                <Badge
                                    isOneChar
                                    content={currentQuestion?.section?.id === section.id && <CheckIcon />}
                                    key={section.id}
                                    color={currentQuestion?.section?.id === section.id ? "primary" : "default"}
                                    placement="top-right"
                                >
                                    <SectionCard
                                        onClick={() => { setSectionBeforeSave(section); onClose() }}
                                        key={section.id}
                                        section={section}
                                        draggable={false}
                                    />
                                </Badge>
                            )}
                        />
                    </Fragment>
                }
            />
        </section>
    )
});
