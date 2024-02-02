import { Radio, RadioGroup } from '@nextui-org/react';
import { QuestionsInsideSection } from '../../http/dto/questions/QuestionsBySectionResponse';

interface Props {
    questions   : Array<QuestionsInsideSection>;
    onChange    : (formik: any, value: number, questionId: number) => void;
    formik      : any;
}

export const OptionQuestion = ({ questions,onChange }: Props) => {
    return (
        <>
            {
                questions.map(({ id, name, qualification }) => (

                    <div className="my-10" key={id}>
                        <p className="font-bold">{name}</p>
                        <span>
                            <RadioGroup
                                color="primary"
                                orientation="horizontal"
                                onValueChange={(value: string) => onChange(formik, +value, id)}
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
        </>
    )
}
