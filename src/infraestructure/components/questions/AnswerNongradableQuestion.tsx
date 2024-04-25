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
    validationSchema: isBinary ? Yup.object(qustionAnswerValidation(section.questions)) : false,
    onSubmit: async (data) => {
      if (section.canFinishGuide && !isBinary) {
        await saveQuestionNongradableUser({ [`question_section_${section.id}`]: JSON.stringify(isBinary) });
        await endSurveyUser();
        
      } else if (section.canFinishGuide && isBinary) {
        saveQuestionNongradableUser({ [`question_section_${section.id}`]: JSON.stringify(isBinary) }).then(async () => {
          await clearQuestionBySection();
          if ((currentPage) === totalQuestions) return endSurveyUser();
          return await startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
        });
      } else {
        if (section.binary) {
          isBinary ?
            await saveQuestionNongradableUser({ [`question_section_${section.id}`]: JSON.stringify(isBinary), ...data }).then(() => clearQuestionBySection())
            : await saveQuestionNongradableUser({ [`question_section_${section.id}`]: JSON.stringify(isBinary) }).then(() => clearQuestionBySection())
        } else {
          await saveQuestionNongradableUser(data).then(() => clearQuestionBySection())
        }
        if ((currentPage) === totalQuestions) return endSurveyUser();
        return await startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
      }

    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        section.binary && (
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
        (section.type === 'nongradable' && isBinary) && section.questions?.map(({ id, name }) => (
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
            currentPage={(section.canFinishGuide && !isBinary) ? totalQuestions! : currentPage!}
            totalItems={totalQuestions!}
          />
        )
      }
    </form>
  )
}
