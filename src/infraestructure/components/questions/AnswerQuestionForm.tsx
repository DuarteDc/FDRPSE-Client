import * as Yup from 'yup';
import { Button, Progress, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionsInsideSection } from "../../http/dto/questions/QuestionsBySectionResponse"
import { createFieldQuestion } from "../../../app/helpers/createFiledsQuestion";
import { useFormik } from "formik";
import { getProgessByStep } from "../../../app/helpers/getProgessByStep";
import { ChevonLeft } from "../icons";
import { useAnswerQuestion } from "../../../app/hooks/useAnswerQuestion";
import { qustionAnswerValidation } from '../../validations/question.validations';

interface Props {
  questions: Array<QuestionsInsideSection>;
}
export const AnswerQuestionForm = ({ questions }: Props) => {

  const { handleNextStep, handlePreviousStep, step, handleChangeOptionValue } = useAnswerQuestion();

  const formik = useFormik({
    initialValues: createFieldQuestion(questions),
    validationSchema: Yup.object(qustionAnswerValidation(questions)),
    onSubmit: (data) => {
      const xd = Object.entries(data).map(([key, value]) => {
        const question_id = key.split("_").pop();
        return { question_id, qualification: value }
      })
      console.log(xd);
      handleNextStep();
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
      <footer className="fixed left-0 bottom-0 w-full backdrop-blur-lg bg-background/70 border-t border-divider">
        <Progress value={getProgessByStep(questions.length, step)} aria-label="question-pogress" classNames={{ indicator: "bg-gradient-to-r from-primary via-emerald-500 to-emerald-500", }} />
        <div className="flex justify-between py-2 px-4 md:px-40 lg:max-w-[2000px] mx-auto">
          <Button className="hover:border-slate-800 hover:border-2 border-2 border-transparent"
            onClick={handlePreviousStep}
            variant="bordered" startContent={
              <ChevonLeft />
            }>
            Regresar
          </Button>
          <Button color="primary" type="submit"
          >
            Siguiente
          </Button>
        </div>
      </footer>
    </form>
  )
}
