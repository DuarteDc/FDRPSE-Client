import { useContext, useEffect } from 'react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { CardQuestion, FormQuestion } from '../../../infraestructure/components/questions';
import { useQuestion } from '../../hooks/useQuestion';

import { CategoryContext } from '../../../infraestructure/context/category';
import { DomainContext } from '../../../infraestructure/context/domain';
import { DimensionContext } from '../../../infraestructure/context/dimension';
import { Button } from '@nextui-org/react';
import { QualificationContext } from '../../../infraestructure/context/qualification';
import { NumbersIcon, PlayListIcon } from '../../../infraestructure/components/icons';

export const CreateQuestionPage = () => {

    const { categories } = useContext(CategoryContext);
    const { domains } = useContext(DomainContext);
    const { dimensions } = useContext(DimensionContext);
    const { qualifications } = useContext(QualificationContext);

    const { loading, startGetCategoriesDomainAndDimenstions, question, onDragStart, onDragEnd, allowDrop, onDropQuestion, questions } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <div className="grid grid-cols-1">
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
                                        <Button color="primary" className="float-left bg-slate-800" startContent={<NumbersIcon />}>Seleccionar tabla de calificaciones</Button>
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
            </div>
        </PageLayout>
    )
}


