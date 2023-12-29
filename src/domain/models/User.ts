interface UserType  {
    id          : string;
    name        : string;
    lastName    : string;
    email       : string;
    createdAt   : Date
    updatedAt   : Date;
}

export class User implements UserType {

    readonly id         : string;
    readonly name       : string; 
    readonly lastName   : string; 
    readonly email      : string;
    readonly createdAt  : Date; 
    readonly updatedAt  : Date;

    constructor(id: string, name: string, lastName: string, email: string, createdAt: string, updatedAt: string) { 
        this.id         = id;
        this.name       = name;
        this.lastName   = lastName;
        this.email      = email;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }

}