export interface Guide {
    id:             number;
    name:           string;
    gradable:       boolean;
    createdAt:      Date;
    updatedAt:      Date;
    status:         number;
    qualification?: GuideQualification;
}

export interface GuideQualification {
    id:                    number;
    low:                   string;
    high:                  string;
    middle:                string;
    veryHigh:              string;
    despicable:            string;
}


export enum StatusGuide {
    noInitialized = 0,
    inProgress = 1,
    finished = 2,
    paused = 3,
}

export interface ChangeStatusGuide {
    guide: ChangeStatusGuideItem
}

export interface FinalizeGuideAndStartNextGuide {
    currentGuide: ChangeStatusGuideItem;
    nextGuide: ChangeStatusGuideItem | null;
}
interface ChangeStatusGuideItem {
    id: number;
    status: StatusGuide
}