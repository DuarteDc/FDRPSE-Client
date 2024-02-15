export interface GetOneSurveyResponseDto {
    survey: Array<SurveyDetailDto>;
}

export interface SurveyDetailDto {
    user_id: string;
    answers: Array<Answer>,
    user: User;
    total: string;
    status: boolean;
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
    id          : string;
    nombre      : string;
    apellidoP   : string;
    apellidoM   : string;
    area: {
        id          : string;
        nombreArea  : string;
    }
}