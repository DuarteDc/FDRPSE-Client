import { Spinner } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { questionService } from "../../../domain/services/question.service"
import { QuestionsBySectionResponse } from "../../../infraestructure/http/dto/questions"
import { AnswerQuestionForm } from "../../../infraestructure/components/questions/AnswerQuestionForm"


export const UserQuestion = () => {

    const { startGetQuestionsBySection } = questionService();

    const [questions, setQuestions] = useState<QuestionsBySectionResponse>();

    useEffect(() => {
        startGetQuestionsBySection().then(setQuestions);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-semibold text-emerald-600 text-xl">{questions?.section.name}</h1>
                <div className="text-left mt-10">
                    {
                        questions?.section.binary ? (
                            <>
                                <span className="font-semibold text-emerald-600">{questions?.section.question}</span>
                                <span>
                                    {
                                        !questions?.section?.questions ? (
                                            <section className="min-h-screen bg-gray-100/80 w-full top-0 left-0 fixed z-[9999] flex items-center justify-center">
                                                <Spinner color="current" size="lg" />
                                            </section>
                                        ) :
                                            <AnswerQuestionForm questions={questions.section.questions} />
                                    }
                                </span>
                            </>
                        ) : (
                            <>
                                {
                                    !questions?.section?.questions ? (
                                        <section className="min-h-screen bg-gray-600/60"></section>
                                    ) :
                                        <AnswerQuestionForm questions={questions.section.questions} />
                                }
                            </>
                        )
                    }
                </div>
            </div>

        </>
    )
}
