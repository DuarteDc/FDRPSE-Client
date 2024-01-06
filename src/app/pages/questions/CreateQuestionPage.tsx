import { PageLayout } from '../../../infraestructure/components/ui';
import { FormQuestion } from '../../../infraestructure/components/questions';
import { useQuestion } from '../../hooks/useQuestion';

export const CreateQuestionPage = () => {

    const { loading, question } = useQuestion();

    return (
        <PageLayout title="Crear Pregunta" navigateTo="/admin/questions">
            <div className="grid grid-cols-2">
                {
                    question ?
                        <div>
                            <span className="border-2 border-emerald-600 px-5 py-8 rounded-xl cursor-pointer" draggable>
                                {question.question}
                            </span>

                            <span onDragOver={(e) => console.log(e)} className="border-2 border-red-600 h-[20rem] w-full block mt-60">
                                {question.question}
                            </span>
                        </div>
                        : <FormQuestion />
                }
                <div className="flex justify-center">
                    <img src="/assets/form.svg" alt="form-icon" width={600} height={300} />
                </div>
            </div>
        </PageLayout>
    )
}
