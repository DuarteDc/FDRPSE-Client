import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Radio, RadioGroup } from "@nextui-org/react";
import { QuestionsInsideSection } from "../../http/dto/questions/QuestionsBySectionResponse"
import { createFieldQuestion } from "../../../app/helpers/createFiledsQuestion";
import { useAnswerQuestion } from "../../../app/hooks/useAnswerQuestion";
import { qustionAnswerValidation } from '../../validations/question.validations';
import { questionService } from '../../../domain/services/question.service';
import { FooterControls } from '.';
import { surveyService } from '../../../domain/services/survey.service';
import { guideService } from '../../../domain/services/guide.service';
interface Props {
  questions: Array<QuestionsInsideSection>;
  hasSubquestions: string | null;
  showFooterControls?: boolean;
}

export const AnswerQuestionForm = ({ questions, hasSubquestions, showFooterControls = true }: Props) => {

  const { handlePreviousStep, handleChangeOptionValue } = useAnswerQuestion();
  const { totalQuestions, currentPage, saveQuestionUser, clearQuestionBySection, startGetQuestionsBySection, sectionQuestions } = questionService();
  const { endSurveyUser } = surveyService();
  const { guideUser } = guideService();

  const [isBinary, setIsBinary] = useState(!hasSubquestions);
  const formik = useFormik({
    initialValues: createFieldQuestion(questions),
    validationSchema: isBinary ? Yup.object(qustionAnswerValidation(questions)) : false,
    onSubmit: (data) => {
      clearQuestionBySection();
      if (!isBinary) {
        clearQuestionBySection();
        if ((currentPage) === totalQuestions) endSurveyUser();
        else startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
        return saveQuestionUser(`${guideUser!.surveyId}`, `${guideUser!.guideId}`, { [`question_section_${sectionQuestions!.id}`]: JSON.stringify(isBinary) });
      }
      if (!sectionQuestions?.binary) {
        return saveQuestionUser(`${guideUser!.surveyId}`, `${guideUser!.guideId}`, data).then(() => {
        }).then(() => {
          if ((currentPage) === totalQuestions) return endSurveyUser();
          startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
        })
      } else {
        saveQuestionUser(`${guideUser!.surveyId}`, `${guideUser!.guideId}`, { [`question_section_${sectionQuestions!.id}`]: JSON.stringify(isBinary), ...data }).then(() => {
        }).then(() => {
          if ((currentPage) === totalQuestions) return endSurveyUser();
          startGetQuestionsBySection(guideUser?.guideId!, currentPage! + 1);
        })
      }

    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        hasSubquestions && (
          <>
            <h3 className="mb-2">{hasSubquestions}</h3>
            <RadioGroup defaultValue="false" orientation="horizontal" onValueChange={(value) => setIsBinary(JSON.parse(value))}>
              <Radio value="false">No</Radio>
              <Radio value="true">Si</Radio>
            </RadioGroup>
          </>
        )
      }
      {
        (isBinary) && (
          questions?.map(({ id, name, qualification }) => (
            <div className="my-10" key={id}>
              <p className="font-bold">{name}</p>
              <span>
                <RadioGroup
                  color="primary"
                  orientation="horizontal"
                  onValueChange={(value: string) => handleChangeOptionValue(formik, +value, id)}
                  name={`question_id_${id}`}
                  isInvalid={formik.touched[`question_id_${id}`] && formik.errors[`question_id_${id}`] ? true : false}
                  errorMessage={formik.touched[`question_id_${id}`] && formik.errors[`question_id_${id}`] && formik.errors[`question_id_${id}`]}
                  value={formik.values[`question_id_${id}`]}
                  isRequired
                >
                  <Radio value={qualification.always_op}>Siempre</Radio>
                  <Radio value={qualification.almost_alwyas_op}>Casi Siempre</Radio>
                  <Radio value={qualification.sometimes_op}>Algunas veces</Radio>
                  <Radio value={qualification.almost_never_op}>Casi nunca</Radio>
                  <Radio value={qualification.never_op}>Nunca</Radio>
                </RadioGroup>
              </span>
            </div>
          ))
        )
      }
      {
        showFooterControls && (
          <FooterControls
            handlePreviousStep={handlePreviousStep}
            currentPage={currentPage!}
            totalItems={totalQuestions!}
          />
        )
      }
    </form >
  )
}
