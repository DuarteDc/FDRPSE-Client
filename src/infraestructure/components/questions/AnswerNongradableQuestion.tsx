import * as Yup from 'yup';
import { useFormik } from "formik";

import { Radio, RadioGroup } from '@nextui-org/react';
import { FooterControls } from '.';
import { useAnswerQuestion } from '../../../app/hooks/useAnswerQuestion';
import { questionService } from '../../../domain/services/question.service';
import { createFieldQuestion } from '../../../app/helpers/createFiledsQuestion';
import { qustionAnswerValidation } from '../../validations/question.validations';
import { useState } from 'react';
import { surveyService } from '../../../domain/services/survey.service';
import { guideService } from '../../../domain/services/guide.service';
import { QuestionsBySection } from '../../http/dto/questions/QuestionsBySectionResponse';

interface Props {
  section: QuestionsBySection;
  showFooterControls?: boolean;
}

export const AnswerNongradableQuestion = ({ section, showFooterControls = true }: Props) => {

  const { handlePreviousStep, handleChangeOptionValue } = useAnswerQuestion();

  const { endSurveyUser } = surveyService();
  const [isBinary, setIsBinary] = useState(!section.binary);
  const { totalQuestions, currentPage, startGetQuestionsBySection, saveQuestionNongradableUser, clearQuestionBySection } = questionService();

  const { guideUser } = guideService();

  const formik = useFormik({
    initialValues: createFieldQuestion(section.questions!),
    validationSchema: Yup.object(qustionAnswerValidation(section.questions)),
    onSubmit: (data) => {
      if (section.canFinishGuide && !isBinary) {
        saveQuestionNongradableUser({ [`question_nongradable_${section.id}`]: JSON.stringify(isBinary) });
        endSurveyUser();
      } else if (section.canFinishGuide && isBinary) {
        saveQuestionNongradableUser({ [`question_nongradable_${section.id}`]: JSON.stringify(isBinary) }).then(() => {
          clearQuestionBySection();
          if ((currentPage) === totalQuestions) return endSurveyUser();
          return startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
        });
      } else {
        saveQuestionNongradableUser(data).then(() => clearQuestionBySection())
        if ((currentPage) === totalQuestions) return endSurveyUser();
        return startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
      }

    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {
        section.binary && section?.canFinishGuide && (
          <>
            <h3 className="mb-2 font-bold capitalize text-sm md:text-base lg:text-lg">{section.question}</h3>
            <RadioGroup
              defaultValue="false"
              orientation="horizontal"
              className="w-full flex items-center justify-center py-4"
              onValueChange={(value) => setIsBinary(JSON.parse(value))}
            >
              <Radio value="false">No</Radio>
              <Radio value="true">Si</Radio>
            </RadioGroup>
          </>
        )
      }
      {
        section.type === 'nongradable' && section.questions?.map(({ id, name }) => (
          <div className="my-10" key={id}>
            <p className="font-bold">{name}</p>
            <span>
              <RadioGroup
                color="primary"
                orientation="horizontal"
                onValueChange={(value: string) => handleChangeOptionValue(formik, value, id)}
                name={`question_id_${id}`}
                isInvalid={formik.touched[`question_id_${id}`] && formik.errors[`question_id_${id}`] ? true : false}
                errorMessage={formik.touched[`question_id_${id}`] && formik.errors[`question_id_${id}`] && formik.errors[`question_id_${id}`]}
                value={formik.values[`question_id_${id}`]}
                isRequired
              >
                <Radio value="true">Si</Radio>
                <Radio value="false">No</Radio>
              </RadioGroup>
            </span>
          </div>
        ))
      }
      {

        showFooterControls && (
          <FooterControls
            handlePreviousStep={handlePreviousStep}
            currentPage={!isBinary ? totalQuestions! : currentPage!}
            totalItems={totalQuestions!}
          />
        )
      }
    </form>
  )
}
