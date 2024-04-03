import * as Yup from 'yup';
import { useFormik } from "formik";

import { Radio, RadioGroup } from '@nextui-org/react';
import { QuestionsBySection } from '../../http/dto/questions/QuestionsBySectionResponse';
import { FooterControls } from '.';
import { useAnswerQuestion } from '../../../app/hooks/useAnswerQuestion';
import { questionService } from '../../../domain/services/question.service';
import { createFieldQuestion } from '../../../app/helpers/createFiledsQuestion';
import { qustionAnswerValidation } from '../../validations/question.validations';
import { useState } from 'react';
import { useNavigation } from '../../../app/hooks/useNavigation';

interface Props {
  section: QuestionsBySection;
}

export const AnswerNongradableQuestion = ({ section }: Props) => {

  const { handlePreviousStep, handleChangeOptionValue } = useAnswerQuestion();

  const [isBinary, setIsBinary] = useState(!section.binary);
  const { totalQuestions, currentPage, startGetQuestionsBySection, saveQuestionNongradableUser } = questionService();

  const { navigate } = useNavigation();

  const formik = useFormik({
    initialValues: createFieldQuestion(section.questions),
    validationSchema: Yup.object(qustionAnswerValidation(section.questions)),
    onSubmit: (data) => {

      if (section.can_finish_guide && !isBinary) {
        return navigate("/auth/user/questions", { replace: true });
      }
      //saveQuestionNongradableUser(data)
      startGetQuestionsBySection(currentPage! + 1)
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {
        section.binary && section?.can_finish_guide && (
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
                label={`form-label-${section.name}`}
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
      <FooterControls
        handlePreviousStep={handlePreviousStep}
        currentPage={!isBinary ? totalQuestions! : currentPage!}
        totalItems={totalQuestions!}
      />
    </form>
  )
}
