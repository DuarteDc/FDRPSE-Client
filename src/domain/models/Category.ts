interface CategorySchema {
    id          : string;
    name        : string;
    createdAt   : Date;
    updatedAt   : Date;
}

export class Category implements CategorySchema {

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