interface QualificationSchema {
    id              : string;
    name            : string;
    always_op       : string;
    almost_alwyas_op: string;
    sometimes_op    : string;
    almost_never_op : string;
    never_op        : string;
    createdAt       : Date;
    updatedAt       : Date;
}

export class Qualification implements QualificationSchema {
    readonly id                 : string;
    readonly name               : string;
    readonly always_op          : string;
    readonly almost_alwyas_op   : string;
    readonly sometimes_op       : string;
    readonly almost_never_op    : string;
    readonly never_op           : string;
    readonly createdAt          : Date;
    readonly updatedAt          : Date;

    constructor(id: string, name: string, always_op: string, almost_alwyas_op: string, sometimes_op: string, almost_never_op: string, never_op: string, createdAt: string, updatedAt: string) {

        this.id               = id;              
        this.name             = name;            
        this.always_op        = always_op;       
        this.almost_alwyas_op = almost_alwyas_op;
        this.sometimes_op     = sometimes_op; 
        this.almost_never_op  = almost_never_op;
        this.never_op         = never_op;        
        this.createdAt        = new Date(createdAt);
        this.updatedAt        = new Date(updatedAt);

    }

}