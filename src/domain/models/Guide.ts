export interface Guide {
    id:        number;
    name:      string;
    surveyId:  number | null;
    gradable:  boolean;
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
}