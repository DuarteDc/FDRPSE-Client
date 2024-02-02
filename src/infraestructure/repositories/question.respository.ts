import { http } from '../http/http';
import { Question } from '../../domain/models';
import { CreateQuestionDto, QuestionResponseDto, QuestionsBySectionResponse, QuestionsResponseDto, SaveUserQuestionDto } from '../http/dto/questions';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';

export const questionRepository = {

    getQuestions: async (): Promise<Array<Question> | string> => {
        try {
            const { questions } = await http.get<QuestionsResponseDto>('/questions');
            return questions.map(({ id, name, created_at, updated_at }) => new Question(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createQuestion: async (createQuestionDto: CreateQuestionDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/questions/create', createQuestionDto);
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    getQuestionById: async (questionId: string): Promise<Question | string> => {
        try {
            const { question } = await http.get<QuestionResponseDto>(`/questions/${questionId}`);
            return new Question(question.id, question.name, question.created_at, question.updated_at, question.section!, question.category!, question?.qualification, question?.dimesion, question?.domain);
        } catch (error) {
            return error as string;
        }
    },

    getQuestionBySection: async (page: number): Promise<QuestionsBySectionResponse | string> => {
        try {
            const response = await http.get<QuestionsBySectionResponse>(`/questions/section?page=${page}`);
            return response;
        } catch (error) {
            return error as string;
        }
    },

    saveUserAnswers: async (saveUserQuestionDto: SaveUserQuestionDto): Promise<CommonResponseDto> => {
        try {
            const { message, success } = await http.post<CommonResponseDto>('/surveys/save-questions', saveUserQuestionDto);
            succesAlert(message);
            return { message, success }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    }


}