import * as Yup from 'yup';
import { Radio, RadioGroup } from "@nextui-org/react";
import { QuestionsInsideSection } from "../../http/dto/questions/QuestionsBySectionResponse"
import { createFieldQuestion } from "../../../app/helpers/createFiledsQuestion";
import { useFormik } from "formik";
import { useAnswerQuestion } from "../../../app/hooks/useAnswerQuestion";
import { qustionAnswerValidation } from '../../validations/question.validations';
import { questionService } from '../../../domain/services/question.service';
import { FooterControls } from '.';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
  questions: Array<QuestionsInsideSection>;
  hasSubquestions: string | null;
}
export const AnswerQuestionForm = ({ questions, hasSubquestions }: Props) => {

  const { handlePreviousStep, handleChangeOptionValue } = useAnswerQuestion();
  const { totalQuestions, currentPage, saveQuestionUser, clearQuestionBySection, startGetQuestionsBySection } = questionService();

  const [isBinary, setIsBinary] = useState(!hasSubquestions);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: createFieldQuestion(questions),
    validationSchema: isBinary ? Yup.object(qustionAnswerValidation(questions)) : false,
    onSubmit: (data) => {
      if (!isBinary) {
        clearQuestionBySection();
        return startGetQuestionsBySection(currentPage! + 1);
      }
      saveQuestionUser(data, currentPage!).then(() => {
        clearQuestionBySection();
      }).then(() => {
        if ((currentPage) === totalQuestions) return navigate("success-answer", { replace: true })
        startGetQuestionsBySection(currentPage! + 1);
      })

    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        hasSubquestions && (
          <>
            <h3>{hasSubquestions}</h3>
            <RadioGroup defaultValue="false" onValueChange={(value) => setIsBinary(JSON.parse(value))}>
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

      <FooterControls
        handlePreviousStep={handlePreviousStep}
        currentPage={currentPage!}
        totalItems={totalQuestions!}
      />
    </form >
  )
}
