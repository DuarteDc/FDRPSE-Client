import * as Yup from 'yup';
import { Button, Progress, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionsInsideSection } from "../../http/dto/questions/QuestionsBySectionResponse"
import { createFieldQuestion } from "../../../app/helpers/createFiledsQuestion";
import { useFormik } from "formik";
import { getProgessByStep } from "../../../app/helpers/getProgessByStep";
import { ChevonLeft } from "../icons";
import { useAnswerQuestion } from "../../../app/hooks/useAnswerQuestion";
import { qustionAnswerValidation } from '../../validations/question.validations';
import { questionService } from '../../../domain/services/question.service';
import { useMemo } from 'react';
import { FooterControls } from '.';

interface Props {
  questions: Array<QuestionsInsideSection>;
}
export const AnswerQuestionForm = ({ questions }: Props) => {

  const { handleNextStep, handlePreviousStep, step, handleChangeOptionValue } = useAnswerQuestion();

  const { startGetQuestionsBySection, clearQuestionBySection, totalQuestions, currentPage, saveQuestionUser } = questionService();

  const formik = useFormik({
    initialValues: createFieldQuestion(questions),
    validationSchema: Yup.object(qustionAnswerValidation(questions)),
    onSubmit: (data) => {
      saveQuestionUser(data).then(() => {
        handleNextStep();
        clearQuestionBySection();
        startGetQuestionsBySection(currentPage! + 1);
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {
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
      }
      <FooterControls
        currentPage={currentPage!}
        totalItems={totalQuestions!}
      />
    </form>
  )
}
