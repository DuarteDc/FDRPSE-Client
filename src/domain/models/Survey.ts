interface SurveySchema {
    id          : string;
    startDate  : string;
    endDate    : string | null;
    status      : boolean
    createdAt   : Date;
    updatedAt   : Date;
}

export class Survey implements SurveySchema {

    readonly id;
    readonly startDate;
    readonly endDate;
    readonly status;
    readonly createdAt;
    readonly updatedAt;

    constructor(id: string, start_date:string, end_date: string | null, status: boolean, createdAt: string, updatedAt: string) {
        this.id         = id;
        this.startDate  = start_date;
        this.endDate    = end_date;
        this.status     = status;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }
            
}