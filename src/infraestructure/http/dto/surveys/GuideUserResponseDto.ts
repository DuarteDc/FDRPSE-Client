export interface GuideUserResponseDto {
    guide_user: GuideUserClass;
}

interface GuideUserClass {
    user_id: number;
    total: number;
    status: boolean;
    answers: Answer[];
    user: User;
}

interface Answer {
    question_id: number;
    name: string;
    category: Category;
    section: Ion;
    domain: Category;
    dimension: Ion;
    qualification: number;
    qualification_data: QualificationData;
}

interface Category {
    id: number;
    name: string;
    qualification: Qualification;
}

interface Qualification {
    id: number;
    despicable: string;
    low: string;
    middle: string;
    high: string;
    very_high: string;
}

interface Ion {
    id: number;
    name: string;
}

interface QualificationData {
    always_op: number;
    almost_alwyas_op: number;
    sometimes_op: number;
    almost_never_op: number;
    never_op: number;
}

interface User {
    id: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    id_area: number;
    area: Area;
}

interface Area {
    id: number;
    nombreArea: string;
}
