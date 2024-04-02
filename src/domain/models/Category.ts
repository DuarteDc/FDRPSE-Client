interface CategorySchema {
    id                  : string;
    name                : string;
    qualificationsCount?: number;
    createdAt           : Date;
    updatedAt           : Date;
}

export class Category implements CategorySchema {

    readonly id                     : string;
    readonly name                   : string;
    readonly qualificationsCount   ?: number;
    readonly createdAt              : Date;
    readonly updatedAt              : Date;

    constructor(id: string, name:string, createdAt: string, updatedAt: string, qualificationsCount?: number) {
        this.id                     = id;
        this.name                   = name;
        this.qualificationsCount    = qualificationsCount || 0;
        this.createdAt              = new Date(createdAt);
        this.updatedAt              = new Date(updatedAt);
    }

}