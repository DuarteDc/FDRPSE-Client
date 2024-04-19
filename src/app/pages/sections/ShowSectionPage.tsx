import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton, Tooltip, useDisclosure } from '@nextui-org/react';
import { AlertConfirm, LoadingScreen, PageLayout } from '../../../infraestructure/components/ui';
import { sectionService } from '../../../domain/services/section.service';
import { DotsVertical, HelpHexagon, InfoCircle, TrashIcon } from '../../../infraestructure/components/icons';
import { QuestionDetailItem, QuestionDetailList } from '../../../infraestructure/components/sections';
import { QuestionInsideSection } from '../../../domain/models';

export const ShowSectionPage = () => {

    const { id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const questionRef = useRef<QuestionInsideSection>();
    const { getSecionById, clearSectionCache, sectionDetail, startDeleteQuestionBySection, loading } = sectionService({});

    useEffect(() => {
        getSecionById(id!);
        return () => {
            clearSectionCache();
        }
    }, []);

    return (
        <PageLayout title="Detalle de la sección">
            {
                sectionDetail ? (
                    <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-2xl lg:text-5xl font-bold">{sectionDetail?.name}</h2>
                ) : (
                    <div className="mt-10 w-full h-[10rem]">
                        <Skeleton className="w-full h-12 rounded-full my-2" />
                        <Skeleton className="w-9/12 h-9 rounded-full my-2" />
                    </div>
                )
            }
            <>
                {
                    sectionDetail?.binary && (
                        <div className="lg:grid lg:grid-cols-2 flex  my-5">
                            <span className="text-emerald-600 text-sm lg:text-2xl font-bold w-full">{sectionDetail.question}</span>
                            <span className="text-emerald-600 text-2xl font-bold ml-auto">
                                <Tooltip content="La sección es opcional por lo que podrá ser omitida." color="foreground">
                                    <Chip variant="bordered" color="primary" size="sm" className="cursor-pointer">Opcional</Chip>
                                </Tooltip>
                            </span>
                        </div>
                    )
                }
            </>
            <section className="my-10">
                <span className="flex items-center [&>svg]:text-emerald-600 my-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <HelpHexagon width={35} height={35} strokeWidth={2} />
                    <p className="font-bold text-2xl">Preguntas dentro de la sección</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí se muestran las preguntas que pertenecen a la sección</p>
                {
                    sectionDetail?.canFinishGuide ? (
                        <div className="w-full p-4 h-[15rem] bg-primary/10 rounded-lg mt-2 flex flex-col items-center justify-center font-bold [&>svg]:text-yellow-500">
                            <InfoCircle strokeWidth={2} width={80} height={80}/>
                            La sección no cuenta con preguntas porque es una sección especial.
                            <p>La sección puede terminar el cuestionario cuando esta se responda de manera negativa o continuar si se responde de manera positiva.</p>
                            <sub className="mt-10 text-gray-400">Se aconseja establecer la sección al inicio del cuestionario</sub>
                        </div>
                    ) : (

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                            {
                                loading && (<LoadingScreen title="Espere ..." />)
                            }
                            <QuestionDetailList
                                questions={sectionDetail?.questions}
                                renderChilds={(({ question, navigate }) => (
                                    <QuestionDetailItem
                                        navigate={navigate}
                                        renderButtonOptions={(question) => (
                                            <div className="absolute top-2 right-2">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button className="border-2 bg-transparent" isIconOnly>
                                                            <DotsVertical />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem
                                                            key="show"
                                                            color="danger"
                                                            className="text-danger"
                                                            onClick={() => { questionRef.current = question, onOpen() }}
                                                            description="Puedes desactivar el cuestionario"
                                                            startContent={<TrashIcon />}
                                                        >
                                                            Eliminar
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        )}
                                        onPress={() => { }}
                                        question={question}
                                    />
                                ))}
                            />
                        </div>
                    )
                }
            </section>
            <AlertConfirm
                isOpen={isOpen}
                isOpenChange={onOpenChange}
                confirmButtonColor="danger"
                title="¿Estas seguro que deseas eliminar la pregunta?"
                callback={() => startDeleteQuestionBySection(id!, questionRef.current?.id!)}
                subtitle={
                    <span className={`flex flex-col items-center  [&>svg]:text-danger [&>svg]:border-danger/60' 
                     mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2 text-xs text-center py-4 [&>svg]:mb-2`}>
                        <TrashIcon width={46} height={46} strokeWidth={1.7} />
                        <p className="font-bold">
                            La pregunta será eliminada por lo que ya no estará disponible dentro de la sección
                        </p>
                    </span>
                }

            />
        </PageLayout >
    )
}
