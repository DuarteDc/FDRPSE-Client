import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Chip, Skeleton, Tooltip, useDisclosure } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { sectionService } from '../../../domain/services/section.service';
import { HelpHexagon, SectionIcon, XIcon } from '../../../infraestructure/components/icons';
import { QuestionDetailItem, QuestionDetailList } from '../../../infraestructure/components/sections';
import { Modal } from '../../../infraestructure/components/ui/Modal';

export const ShowSectionPage = () => {

    const { id } = useParams();
    const { getSecionById, clearSectionCache, sectionDetail } = sectionService({});

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                    <QuestionDetailList
                        questions={sectionDetail?.questions}
                        renderChilds={(({ question, navigate }) => (
                            <QuestionDetailItem
                                navigate={navigate}
                                onPress={onOpen}
                                question={question}
                            />
                        ))}
                    />
                </div>
            </section>
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                hideCloseButton
                size="xl"
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h1>Agregar Seccion</h1>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                    </Fragment>
                )}
            />
        </PageLayout>
    )
}
