import { useContext, useEffect } from 'react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { CardQuestion, FormQuestion } from '../../../infraestructure/components/questions';
import { useQuestion } from '../../hooks/useQuestion';

import { CategoryContext } from '../../../infraestructure/context/category';
import { DomainContext } from '../../../infraestructure/context/domain';
import { DimensionContext } from '../../../infraestructure/context/dimension';
import { Button, ModalContent, Progress, useDisclosure } from '@nextui-org/react';
import { NumbersIcon, PlayListIcon } from '../../../infraestructure/components/icons';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { Link, Route, Routes } from 'react-router-dom';
import { CREATE_QUESTION_ROUTES } from '../../helpers/routes';

export const CreateQuestionPage = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: true });

    const { categories } = useContext(CategoryContext);
    const { domains } = useContext(DomainContext);
    const { dimensions } = useContext(DimensionContext);
    // const { qualifications } = useContext(QualificationContext);

    const { startGetCategoriesDomainAndDimenstions, question, steps, decreaseSteps, increaseSteps } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <Modal
                title="Crear pregunta"
                size="5xl"
                onChange={onOpenChange}
                isOpen={isOpen}
                renderContent={(onClose) =>
                    <div className="w-full flex justify-center items-center flex-col">
                        {
                            CREATE_QUESTION_ROUTES[steps].component({ width: 80, height: 80 })
                        }
                        <div className="flex justify-evenly w-full">
                        <Button color="danger" onClick={() => decreaseSteps()}>Back</Button>
                        {
                            steps < CREATE_QUESTION_ROUTES.length -1 && (
                                <Button color="danger" onClick={() => increaseSteps(CREATE_QUESTION_ROUTES.length - 1)}>Next</Button>
                            )
                        }
                        </div>
                    </div>
                }
            />
            {/* <div className="grid grid-cols-1">
                {
                    !question ? (
                        <FormQuestion
                            categories={categories}
                            domain={domains}
                            dimension={dimensions}
                        />
                    ) : (
                        <div className="col-span-2">
                            <CardQuestion
                                question={question}
                                renderButton={() =>
                                    <div className="flex justify-between">
                                        <Button color="primary" onClick={onOpen} className="float-left bg-slate-800" startContent={<NumbersIcon />}>Seleccionar tabla de calificaciones</Button>
                                        <Button color="primary" className="float-right" startContent={<PlayListIcon />} >Agregar pregunta enlazada</Button>
                                    </div>
                                }
                            // renderChildren={() => (
                            //     questions.map((question) => (
                            //         <CardQuestion question={question} />
                            //     ))
                            // )}
                            />
                        </div>
                    )
                }
            </div> */}
        </PageLayout>
    )
}


