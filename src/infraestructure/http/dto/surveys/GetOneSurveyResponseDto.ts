export interface GetOneSurveyResponseDto {
    survey: Array<SurveyDetail>;
}

interface SurveyDetail {
    user_id: string;
    answers: Array<Answer>,
    user: User;
    total: string;
}

interface Answer {
    question_id     : number,
    name            : string;
    qualification   : number;
    category        : DetailAnswer;
    section         : DetailAnswer;
    domain          : DetailAnswer;
    dimension       : DetailAnswer;
}


interface DetailAnswer {
    id  : number;
    name: string;
}

interface User {
    id      : string;
    nombre  : string;
    userName: string;
    area    :  {
        id          : string;
        nombreArea  : string;
    }
}