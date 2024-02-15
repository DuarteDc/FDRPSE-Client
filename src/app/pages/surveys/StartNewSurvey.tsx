import { useEffect } from "react"
import { sectionService } from "../../../domain/services/section.service";
import { PageLayout } from "../../../infraestructure/components/ui";

export const StartNewSurvey = () => {

    const { startGetSectionsWithQuestions, sections, loading } = sectionService();

    useEffect(() => {
        startGetSectionsWithQuestions();
    }, []);

    return (
        <PageLayout navigateTo="/auth/surveys" title="Comenzar encuesta">
            <code>
                {
                    JSON.stringify(sections)
                }
            </code>
            <code>
                { JSON.stringify(loading)}
            </code>
        </PageLayout>
    )
}
