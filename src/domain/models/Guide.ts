export interface Guide {
    id:             number;
    name:           string;
    gradable:       boolean;
    createdAt:      Date;
    updatedAt:      Date;
    status:         boolean;
    qualification?: Qualification;
}

interface Qualification {
    id:                    number;
    low:                   string;
    high:                  string;
    middle:                string;
    veryHigh:              string;
    despicable:            string;
}