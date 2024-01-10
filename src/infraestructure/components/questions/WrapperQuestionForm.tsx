import { useContext } from 'react';
import { CardQuestion, FormQuestion } from '.';
import { useQuestion } from '../../../app/hooks/useQuestion';
import { QuestionContext } from '../../context/questions';


export const WrapperQuestionForm = () => {

    const { question } = useContext(QuestionContext);

    return (

                <FormQuestion />
            
    )
}
