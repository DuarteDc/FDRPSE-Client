export interface GuideUserSurvey {
    id:        number;
    guideId:   number;
    userId:    number;
    surveyId:  number;
    status:     boolean;
    createdAt: Date;
    updatedAt: Date;
    total:      number;
    // guides:    Guides;
    user:     User;
}

interface User {
    id:         number;
    name:       string;
    last_name:  string;
    area:       Area;
}

interface Area {
    id:         number;
    name: string;
}
