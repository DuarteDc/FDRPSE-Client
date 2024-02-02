export interface SaveUserQuestionDto {
    "questions" : Array<UserQuestion>
}

interface UserQuestion {
    question_id     : string;
    qualification   : number;
}