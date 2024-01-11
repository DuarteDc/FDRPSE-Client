import { ReactNode, useCallback, useReducer } from 'react';
import { QuestionContext, questionReducer } from './';
import { Category, Dimension, Domain, Question } from '../../../domain/models';
import { categoriesService } from '../../../domain/services/categories.service';
import { domianService } from '../../../domain/services/domian.service';
import { dimensionService } from '../../../domain/services/dimension.service';
import { CreateQuestionDto } from '../../http/dto/questions';

export interface QuestionDetail extends Question {
    category?: Category;
    domain?: Domain | undefined;
    dimension?: Dimension | undefined;
}
export interface QuestionState {
    questions: Array<Question> | [];
    question: QuestionDetail | null;
}
interface Props {
    children: ReactNode;
}

const QUESTION_INITIAL_STATE: QuestionState = {
    questions: [],
    question: null,
}

export const QuestionProvider = ({ children }: Props) => {


    const [state, dispatch] = useReducer(questionReducer, QUESTION_INITIAL_STATE);

    const { categories } = categoriesService();
    const { domains } = domianService();
    const { dimensions } = dimensionService();

    const getQuestionDetailsBeforeSave = ({ category_id = '', dimension_id = '', domain_id = '' }) => ({
        category: categories.find(category => category.id == category_id),
        dimension: dimensions.find(dimension => dimension.id == dimension_id),
        domain: domains.find(domain => domain.id == domain_id),
    });

    const preSaveQuestion = ({ question, ...rest }: CreateQuestionDto): void => {
        const getDetails = getQuestionDetailsBeforeSave(rest);
        dispatch({
            type: 'QUESTION - Presave question',
            payload: {
                ...new Question(crypto.randomUUID(), question, new Date().toLocaleString(), new Date().toLocaleString()),
                ...getDetails,
            },
        });
    }

    return (
        <QuestionContext.Provider value={{ ...state, dispatch, preSaveQuestion }}>
            {children}
        </QuestionContext.Provider>
    )
}
