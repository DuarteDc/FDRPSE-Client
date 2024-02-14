interface AreaSchema {
    id          : string;
    name        : string;
}

export class Area implements AreaSchema {

    readonly id         : string;
    readonly name       : string;

    constructor(id: string, name:string) {
        this.id         = id;
        this.name       = name;
    }

}