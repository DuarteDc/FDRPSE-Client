import { ForwardedRef, Fragment, forwardRef } from 'react';
import type { ValidateStep } from '../../../app/utils/questionSteps';
import { Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import { QuestionIcon, SectionIcon } from '../icons';
import { Modal } from '../ui/Modal';
import { useQuestion } from '../../../app/hooks/useQuestion';


export const SubquestionForm = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { sections, setSectionBeforeSave } = useQuestion();

    return (
        <section>
            <form>
                <div className="flex justify-end">
                    <Button color="primary" startContent={<SectionIcon />} onPress={onOpen}>
                        Agregar pregunta
                    </Button>
                </div>
            </form>
            <Modal isOpen={isOpen} onChange={onOpenChange} size="full" title="Establecer sección"
                renderContent={(onClose) =>
                    <Fragment>
                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {
                                sections.map(({ id, name, binary, question, ...rest }) => (
                                    <Card key={id} isPressable onPress={() => setSectionBeforeSave({ id, name, binary, question, ...rest })}>
                                        <CardBody className="text-xs flex flex-col justify-center">
                                            <h3 className="font-bold my-2 flex"><QuestionIcon /> {name}</h3>
                                            {
                                                binary && (
                                                    <span>{question} - {binary} Si/ No</span>
                                                )
                                            }
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </section>
                        <Button onPress={onClose} className="bg-emerald-600 text-white">Continuar</Button>
                    </Fragment>
                }
            />
        </section>
    )
});
