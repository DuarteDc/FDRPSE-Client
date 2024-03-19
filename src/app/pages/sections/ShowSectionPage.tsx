import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';
import { PageLayout } from '../../../infraestructure/components/ui';
import { sectionService } from '../../../domain/services/section.service';

export const ShowSectionPage = () => {

    const { id } = useParams();
    const { section, getSecionById, clearSectionCache } = sectionService({});

    useEffect(() => {
        getSecionById(id!);
        return () => {
            clearSectionCache();
        }
    }, []);

    return (
        <PageLayout title="Detalle de la sección" navigateTo="/auth/sections/">
            {
                section ? (
                    <h2 className="bg-gradient-to-r from-primary via-emerald-600 to-emerald-600 inline-block text-transparent py-5 bg-clip-text text-2xl lg:text-5xl font-bold">{section?.name}</h2>
                ) : (
                    <div className="mt-10 w-full h-[10rem]">
                        <Skeleton className="w-full h-12 rounded-full my-2" />
                        <Skeleton className="w-9/12 h-9 rounded-full my-2" />
                    </div>
                )
            }
            <div>
                {
                    section?.binary && (
                        <span className="text-emerald-600 text-2xl font-bold">{section.question}</span>
                    )
                }
            </div>
            <div>
                {
                    ""
                }
            </div>
            <div>
                {
                    section?.questions.length && (
                        section.questions.map(question => (
                            <div key={question.id} className="my-4 border-2 p-4 rounded-lg">
                                {question.name}
                                <div className="grid grid-cols-5">
                                    <div>
                                        {question.qualification.id}
                                    </div>
                                    <div>
                                        {question.categoryId}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }

                <code>

                    {JSON.stringify(section)}
                </code>
            </div>
        </PageLayout>
    )
}
