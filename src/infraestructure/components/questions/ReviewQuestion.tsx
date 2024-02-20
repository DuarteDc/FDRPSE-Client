import { ForwardedRef, Fragment, forwardRef, useImperativeHandle, useState } from 'react';
import { ValidateStep } from '../../../app/utils/questionSteps';
import { useQuestion } from '../../../app/hooks/useQuestion';
import { CardQuestion } from '.';
import { QuestionIcon } from '../icons';
import { questionService } from '../../../domain/services/question.service';
import { CreateQuestionDto } from '../../http/dto/questions';
import { LoadingScreen } from '../ui';


export const ReviewQuestion = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

  const { question } = useQuestion();
  const { startCreateQuestion } = questionService();
  const [loading, setLoading] = useState(false);

  const handleCreateQuestion = (): CreateQuestionDto => ({
    name: question!.name,
    section_id: question!.section!.id,
    category_id: question?.category?.id,
    domain_id: question?.domain?.id,
    dimension_id: question?.dimension?.id,
    qualification_id: question?.qualification?.id,
  })

  const canContinue = async () => {
    setLoading(true)
    await startCreateQuestion(handleCreateQuestion());
    setLoading(false)
    return false;
  }

  useImperativeHandle(ref, () => ({
    canContinue,
  }));

  return (
    <CardQuestion
      question={question!}
      showOptionQualification={false}
      renderContent={() => (
        <Fragment>
          {loading && <LoadingScreen />}
          <h2>Sección:</h2>
          <div className="flex items-center [&>svg]:mr-2 relative my-2 shadow-lg py-6 rounded-lg w-full min-h-[8rem]">
            <span className="absolute -left-3 w-14 h-10 bg-emerald-600 inset-y-1/3 shadow-xl flex items-center justify-center text-white rounded-lg"><QuestionIcon /></span>
            <div className="flex flex-col justify-center ml-14 w-full">
              <h3 className="font-bold">{question?.section?.name}</h3>
              {
                question?.section?.binary && (
                  <>
                    <span>{question?.section?.question}:</span> <span className="text-sm">Si / No</span>
                  </>
                )
              }
            </div>
          </div>
        </Fragment>
      )}
    />
  )
});
