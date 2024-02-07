interface UserSchema  {
    id          : string;
    name        : string;
    lastName    : string;
    userName    : string;
    issemym     : string;
}

export class User implements UserSchema {

    readonly id;
    readonly name;
    readonly lastName;
    readonly userName;
    readonly issemym;

    constructor(id: string, name: string, lastName: string, userName: string, issemym: string) { 
        this.id         = id;
        this.name       = name;
        this.lastName   = lastName;
        this.userName   = userName;
        this.issemym    = issemym;
    }

}