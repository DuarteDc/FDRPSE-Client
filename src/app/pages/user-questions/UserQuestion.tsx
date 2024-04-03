import { useEffect } from 'react';

import { questionService } from '../../../domain/services/question.service';
import { AnswerQuestionForm } from '../../../infraestructure/components/questions/AnswerQuestionForm';
import { LoadingScreen } from '../../../infraestructure/components/ui';
import { AnswerNongradableQuestion } from '../../../infraestructure/components/questions';

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
                    <LoadingScreen />
                )
            }
            <h1 className="font-semibold text-emerald-600 text-xl">{sectionQuestions?.name}</h1>
            <div className="text-left mt-10">

                {
                    sectionQuestions && (
                        sectionQuestions?.type === 'gradable' ? (
                            <AnswerQuestionForm
                                questions={sectionQuestions.questions}
                                hasSubquestions={sectionQuestions.question}
                            />
                        ) : (
                            <AnswerNongradableQuestion
                                section={sectionQuestions}
                            />
                        )
                    )
                }

            </div>


        </div>)
}
