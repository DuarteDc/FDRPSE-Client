import { useEffect } from "react"
import { sectionService } from "../../../domain/services/section.service";
import { PageLayout } from "../../../infraestructure/components/ui";

export const StartNewSurvey = () => {

    const { startGetSectionsWithQuestions, sections } = sectionService();

    useEffect(() => {
        startGetSectionsWithQuestions();
    }, []);

    return (
        <PageLayout navigateTo="/admin/surveys" title="Comenzar encuesta">
            <code>
                {
                    JSON.stringify(sections)
                }
            </code>
        </PageLayout>
    )
}
