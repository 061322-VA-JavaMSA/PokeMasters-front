import { Nature } from "./nature.enum";
import { Trainer } from "./trainer";

export class Pokemon {
    public id: number;
    public apiId: number;
    public nickname: string;
    public nature: Nature;
    public hp: number;
    public level: number;
    public exp: number;
    public iv: Map<string, number>;
    public ev: Map<string, number>;
    public shiny: boolean;
    public stat: Map<string, number>;
    public trainer: Trainer;
    public ot: Trainer;
    public sprite!: Map<string, string>;
    public data: any;
    constructor(id: number, apiId: number, nickname: string, nature: Nature, hp: number, level: number, exp: number, iv: Map<string, number>, ev: Map<string, number>, shiny: boolean, trainer: Trainer, ot: Trainer) {
        this.id = id;
        this.apiId = apiId;
        this.nickname = nickname;
        this.nature = nature;
        this.hp = hp;
        this.level = level;
        this.exp = exp;
        this.iv = iv;
        this.ev = ev;
        this.shiny = shiny;
        this.trainer = trainer;
        this.ot = ot;
        this.stat = new Map<string, number>;
    }

}

export enum Gender {
    MALE = '♂',
    FEMALE = '♀',
    NONE = ''
}