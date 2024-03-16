import { ForwardedRef, Fragment, forwardRef, useImperativeHandle } from 'react';
import { Badge, Button, Card, useDisclosure } from '@nextui-org/react';
import { CheckIcon, QuestionIcon, SectionIcon } from '../icons';

import { Modal } from '../ui/Modal';
import { useQuestion } from '../../../app/hooks/useQuestion';
import type { ValidateStep, Props as PropsComponent } from '../../../app/utils/questionSteps';
import { SectionCard } from '../sections';


export const SetSection = forwardRef<PropsComponent & ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { sections, setSectionBeforeSave, question: currentQuestion } = useQuestion();

    const canContinue = (): boolean => {
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
            <div className="flex justify-end">
                <Button className="bg-emerald-600 text-white" startContent={<SectionIcon />} onPress={onOpen}>
                    Seleccionar sección
                </Button>
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
                title="Establecer sección" 
                hideCloseButton
                renderContent={(onClose) =>
                    <Fragment>
                        <span className="text-sm text-gray-500 font-semibold">Selecciona la opción a la cual quieres que pertenezca la pregunta</span>
                        <section className="h-full">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                {
                                    sections.map((section) => (
                                        <Badge
                                            isOneChar
                                            content={currentQuestion?.section?.id === section.id && <CheckIcon />}
                                            key={section.id}
                                            color={currentQuestion?.section?.id === section.id ? "primary" : "default"}
                                            placement="top-right"
                                            onClick={() => {setSectionBeforeSave(section)}}
                                        >
                                            <SectionCard 
                                                key={section.id}
                                                section={section}
                                                draggable={false}
                                            />
                                        </Badge>
                                    ))
                                }
                            </div>
                        </section>
                    </Fragment>
                }
            />
        </section>
    )
});
