interface UserSchema  {
    id          : string;
    name        : string;
    lastName    : string;
    userName    : string;
    role        : string;
}

export class User implements UserSchema {

    readonly id;
    readonly name;
    readonly lastName;
    readonly userName;
    readonly role;

    constructor(id: string, name: string, lastName: string, userName: string, role: string) { 
        this.id         = id;
        this.name       = name;
        this.lastName   = lastName;
        this.userName   = userName;
        this.role       = role;
    }

}