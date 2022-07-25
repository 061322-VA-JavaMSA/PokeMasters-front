export class IV {
    public id: number;
    public hp: number;
    public att: number;
    public def: number;
    public satt: number;
    public sdef: number;
    public speed: number;

    constructor(id: number, hp: number, att: number, def: number, satt: number, sdef: number, speed: number) {
        this.id = id;
        this.hp = hp;
        this.att = att;
        this.def = def;
        this.satt = satt;
        this.sdef = sdef;
        this.speed = speed;
    }
}