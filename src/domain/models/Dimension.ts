interface DimensionSchema {
    id          : string;
    name        : string;
    createdAt   : Date;
    updatedAt   : Date;
}

export class Dimension implements DimensionSchema {

    readonly id         : string;
    readonly name       : string;
    readonly createdAt  : Date;
    readonly updatedAt  : Date;

    constructor(id: string, name:string, createdAt: string, updatedAt: string) {
        this.id         = id;
        this.name       = name;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }

}