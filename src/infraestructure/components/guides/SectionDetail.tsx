import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { SectionQuesions } from '../../../domain/models'
import { AlertTriangle, CheckIcon, LinkIcon, QuestionIcon, SectionIcon, XIcon } from '../icons';
import { SkeletonSectionDetail } from '../ui/skeleton';
import { useNavigation } from '../../../app/hooks/useNavigation';

interface Props {
    section?: SectionQuesions;
    loading: boolean;
    onClose: () => void;
}
export const SectionDetail = ({ section, loading, onClose }: Props) => {

    console.log(section)
    const { navigate } = useNavigation();

    return (
        <Fragment>
            {
                (!loading && section) ? (
                    <div>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h1>Detalle de la sección</h1>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <section className="px-2 mt-4">
                            <span className="mb-5 block col-span-7">
                                <span className="flex items-center [&>svg]:text-emerald-600 mt-1">
                                    <p className="font-bold">Nombre:</p>
                                </span>
                                <p className="text-gray-500 font-bold text-xs pl-4">{section?.name}</p>
                            </span>
                            {
                                section?.binary && (
                                    <span className="mb-5 block col-span-7">
                                        <span className="flex items-center [&>svg]:text-emerald-600 mt-1">
                                            <p className="font-bold">Pregunta:</p>
                                        </span>
                                        <p className="text-gray-500 font-bold text-xs pl-4">{section?.question}</p>
                                    </span>
                                )
                            }
                            <span className="mb-5 block col-span-7">
                                <span className="flex items-center [&>svg]:text-emerald-600 mt-1">
                                    <p className="font-bold">Tipo de sección:</p>
                                </span>
                                {
                                    section?.binary ? (
                                        <span className="font-bold text-xs ml-4 p-4 rounded-lg bg-yellow-500/10 mt-2 flex items-center [&>svg]:text-yellow-400 [&>svg]:mr-2
                    [&>svg]:border-2 [&>svg]:rounded-lg [&>svg]:p-1
                ">
                                            <AlertTriangle strokeWidth={2} width={35} height={35} />
                                            La sección es opcional, todas las preguntas que se encuentren dentro de la sección podran ser omitidas por los usuarios
                                        </span>
                                    ) : (
                                        <span className="font-bold text-xs ml-4 p-4 rounded-lg bg-green-500/10 mt-2 flex items-center [&>svg]:text-green-400 [&>svg]:mr-2
                        [&>svg]:border-2 [&>svg]:rounded-lg [&>svg]:p-1
                    ">
                                            <CheckIcon strokeWidth={2} width={35} height={35} />
                                            La sección no es opcional, todas las preguntas que se encuentren dentro de la sección deberan ser contestadas por los usuarios
                                        </span>
                                    )
                                }
                            </span>
                            <span className="mb-5 block col-span-7">
                                {
                                    section.canFinishGuide ? (
                                        <Fragment>
                                            <span className="flex items-center [&>svg]:text-emerald-600 mt-1">
                                                <p className="font-bold">Nota:</p>
                                            </span>
                                            <span className="font-bold text-xs ml-4 p-4 rounded-lg bg-danger/10 mt-2 flex items-center [&>svg]:text-danger-400 [&>svg]:mr-2
                                        [&>svg]:border-2 [&>svg]:rounded-lg [&>svg]:p-1
                                        ">
                                                <XIcon strokeWidth={2} width={35} height={35} />
                                                La sección sólo contiene una pregunta y es opcional por lo que podra responderse de manera positiva o negativa, al ser negativa la respuesta el cuestionario se terminará.
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <span className="flex items-center [&>svg]:text-emerald-600 mt-1">
                                                <p className="font-bold">Preguntas:</p>
                                            </span>
                                            {
                                                !section.questions.length ? (
                                                    <span className="font-bold text-xs ml-4 p-4 rounded-lg bg-danger/10 mt-2 flex items-center [&>svg]:text-danger-400 [&>svg]:mr-2
                                                [&>svg]:border-2 [&>svg]:rounded-lg [&>svg]:p-1
                                            ">
                                                        <XIcon strokeWidth={2} width={35} height={35} />
                                                        La sección no contiene preguntas por lo que sera omitida y no se mostrará a los usuarios
                                                    </span>
                                                ) : (
                                                    <div className="border-2 max-h-[200px] rounded-lg p-4 overflow-x-auto">
                                                        {

                                                            section!.questions.map((question) => (
                                                                <span className="flex items-center font-bold text-xs [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:text-emerald-600 p-1 [&>svg]:mr-2 cursor-pointer hover:bg-gray-100 transition-all duration-400 rounded-lg"
                                                                    key={question.id}
                                                                    aria-label={question.name}
                                                                    title={question.name}>
                                                                    <QuestionIcon strokeWidth={2} /> {question?.name}
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </Fragment>
                                    )
                                }

                            </span>
                        </section>
                        <footer className="flex border-t-2 pt-2 [&>*]:mx-1 [&>*]:font-bold [&>*]:text-xs">
                            <Button
                                onClick={() => navigate(`/auth/sections/${section.id}`)}
                                startContent={<LinkIcon strokeWidth={3} width={20} height={20} />}
                                className="w-full border-2 bg-transparent hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-400 hover:text-white">
                                Ver detalle completo
                            </Button>
                            <Button
                                startContent={<XIcon strokeWidth={3} width={20} height={20} />}
                                onClick={onClose}
                                className="w-full border-2 border-danger bg-danger text-white">
                                Cerrar
                            </Button>
                        </footer>
                    </div>
                ) : (<SkeletonSectionDetail />)
            }
        </Fragment>
    )
}
