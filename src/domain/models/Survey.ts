interface SurveySchema {
    id          : string;
    start_date  : string;
    end_date    : string | null;
    status      : boolean
    createdAt   : Date;
    updatedAt   : Date;
}

export class Survey implements SurveySchema {

    readonly id;
    readonly start_date;
    readonly end_date;
    readonly status;
    readonly createdAt;
    readonly updatedAt;

    constructor(id: string, start_date:string, end_date: string | null, status: boolean, createdAt: string, updatedAt: string) {
        this.id         = id;
        this.start_date = start_date;
        this.end_date   = end_date;
        this.status     = status;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }
            
}