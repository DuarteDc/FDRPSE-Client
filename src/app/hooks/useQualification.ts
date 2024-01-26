import { Qualification } from '../../domain/models';
import { QuestionDetail } from '../../infraestructure/context/questions';
import { useQuestion } from './useQuestion';

export const useQualification = () => {

    const { setQualificationBeforeSave } = useQuestion();

    const handleSetQualification = (qualification: Qualification) => {
        setQualificationBeforeSave(qualification);
    }

    return { handleSetQualification }
}
