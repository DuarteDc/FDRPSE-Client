import { useContext, useEffect } from 'react';

import { PageLayout } from '../../../infraestructure/components/ui';
import { CardQuestion, FormQuestion } from '../../../infraestructure/components/questions';
import { useQuestion } from '../../hooks/useQuestion';

import { CategoryContext } from '../../../infraestructure/context/category';
import { DomainContext } from '../../../infraestructure/context/domain';
import { DimensionContext } from '../../../infraestructure/context/dimension';
import { Button } from '@nextui-org/react';

export const CreateQuestionPage = () => {

    const { categories } = useContext(CategoryContext);
    const { domains } = useContext(DomainContext);
    const { dimensions } = useContext(DimensionContext);

    const { loading, startGetCategoriesDomainAndDimenstions, question, onDragStart, onDragEnd, allowDrop, onDropQuestion, questions } = useQuestion();

    useEffect(() => {
        startGetCategoriesDomainAndDimenstions();
    }, []);

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <div className="grid grid-cols-3">
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
                                renderButton={() => <Button color="primary" className="float-right">Agregar pregunta enlazada</Button>}
                                // renderChildren={() => (
                                //     questions.map((question) => (
                                //         <CardQuestion question={question} />
                                //     ))
                                // )}
                            />
                        </div>
                    )
                }
                <div className="flex justify-center col-span-1">
                    {/* {
                        !question ? (
                            <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
                        ) : (
                            <section className="w-full bg-red-50">
                                <h3 className="text-center">Tabla de valor de opciones de respuesta</h3>
                                <div className="grid grid-cols-2">
                                    <div onDrop={onDropQuestion} onDragOver={allowDrop} className={`w-full h-[40rem] bg-red-600 ${loading ? 'opacity-10' : 'opacity-100 transition-all duration-300 ease-in'}`}>    

                                    </div>
                                    <div onDrop={onDropQuestion} onDragOver={allowDrop} className="w-full h-[40rem] bg-red-600">

                                    </div>
                                </div>
                            </section>
                        )
                    } */}
                </div>
            </div>
        </PageLayout>
    )
}
