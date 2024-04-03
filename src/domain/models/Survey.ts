import { Guide } from './';

export interface Survey {
    id:        number;
    startDate: Date;
    endDate:   Date | null;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
    total:     string;
    guides:    Guide[];
}

// export interface Guide {
//     id:        number;
//     name:      string;
//     surveyid:  null;
//     gradable:  boolean;
//     createdAt: Date;
//     updatedAt: Date;
//     status:    boolean;
// }
