interface AreaSchema {
    id           : string;
    name         : string;
    usersCount   : number;   
    startDate   ?: Date;
    endDate     ?: Date;
}

export class Area implements AreaSchema {

    readonly id;
    readonly name;
    readonly usersCount;
    readonly startDate;
    readonly endDate;

    constructor(id: string, name:string, usersCount = "", startDate ?: Date, endDate?: Date) {
        this.id         = id;
        this.name       = name;
        this.usersCount = usersCount ? Number(usersCount) : 0;
        this.startDate  = startDate ?? undefined;
        this.endDate    = endDate ?? undefined;
    }

}