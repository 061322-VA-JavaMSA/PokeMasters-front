import { StatType } from "./stattype.enum";

export class Stat {

    public id: number;
    public name: StatType;
    public stat: number;
    public iv: number;
    public ev: number;
    constructor(id: number, name: StatType, stat: number, iv: number, ev: number) {
        this.id = id;
        this.name = name;
        this.stat = stat;
        this.iv = iv;
        this.ev = ev;
    }
}