export interface GuideUserResponseDto {
    guide: Guide;
}

export interface Guide {
    id:         number;
    guide_id:   number;
    user_id:    number;
    answers?:   Answer[];
    created_at: string;
    updated_at: string;
    status:     boolean;
    total:      number;
}

export interface Answer {
    question_id:        number;
    name:               string;
    category:           Category;
    section:            Section;
    domain:             Category;
    dimension:          Category;
    qualification:      boolean;
    qualification_name: string;
}

export interface Category {
    id:   string;
    name: string;
}

export interface Section {
    id:   number;
    name: string;
}
