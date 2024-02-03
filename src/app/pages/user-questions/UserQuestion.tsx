import { useEffect } from 'react';
import { Spinner } from '@nextui-org/react';

import { questionService } from '../../../domain/services/question.service';
import { AnswerQuestionForm } from '../../../infraestructure/components/questions/AnswerQuestionForm';

export const UserQuestion = () => {

    const { sectionQuestions, startGetQuestionsBySection, clearQuestionBySection } = questionService();

    useEffect(() => {
        startGetQuestionsBySection();
        return () => {
            clearQuestionBySection();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {
                !sectionQuestions && (
                    <section className="min-h-screen bg-gray-100/95 w-full top-0 left-0 fixed z-[9999] flex items-center justify-center flex-col text-emerald-500">
                        <Spinner color="current" size="lg" />
                    </section>
                )
            }
            <h1 className="font-semibold text-emerald-600 text-xl">{sectionQuestions?.name}</h1>
            <div className="text-left mt-10">

                {
                    sectionQuestions && (
                        <AnswerQuestionForm
                            questions={sectionQuestions.questions}
                            hasSubquestions={sectionQuestions.question}
                        />
                    )
                }

            </div>


        </div>)
}
