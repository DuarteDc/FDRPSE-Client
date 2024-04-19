import { CommonQuestionResponseDto } from ".";

export interface QuestionPaginationResponseDto {
    per_page: number;
    data: CommonQuestionResponseDto[];
    total: number;
}
