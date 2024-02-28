interface AreaSchema {
    id           : string;
    name         : string;
    startDate   ?: Date;
    endDate     ?: Date;
}

export class Area implements AreaSchema {

    readonly id;
    readonly name;
    readonly startDate;
    readonly endDate;

    constructor(id: string, name:string, startDate ?: Date, endDate?: Date) {
        this.id         = id;
        this.name       = name;
        this.startDate  = startDate ?? undefined;
        this.endDate    = endDate ?? undefined;
    }

}