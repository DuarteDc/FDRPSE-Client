import { http } from '../http/http';
import { Question } from '../../domain/models';
import { CreateQuestionDto, QuestionsResponseDto } from '../http/dto/questions';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';

export const questionRepository = {

    getQuestions: async (): Promise<Array<Question> | string> => {
        try {
            const { questions } = await http.get<QuestionsResponseDto>('/questions');
            return questions.map(({ id, question, created_at, updated_at }) => new Question(id, question, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createQuestion: async (createQuestionDto: CreateQuestionDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/questions', createQuestionDto);
            return { message, success: true }
        } catch (error) {
             return { message: error as string, success: false }
        }
    }

}