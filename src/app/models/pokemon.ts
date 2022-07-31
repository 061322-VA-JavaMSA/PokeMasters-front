import { Move } from "./move";
import { Nature } from "./nature.enum";
import { Trainer } from "./trainer";
import { Type } from "./type.enum";

export class Pokemon {
    public id: number;
    public apiId: number;
    public name: string;
    public nickname: string;
    public moves: Move[];
    public sprite: {
        front: string,
        back: string,
        front_a: string,
        back_a: string
    };
    public nature: Nature;
    public hp: number;
    public level: number;
    public exp: number;
    public stats: {
        hp: number,
        att: number,
        def: number,
        satt: number,
        sdef: number,
        speed: number,
    };
    public base: {
        hp: number,
        att: number,
        def: number,
        satt: number,
        sdef: number,
        speed: number,
    };
    public iv: {
        hp: number,
        att: number,
        def: number,
        satt: number,
        sdef: number,
        speed: number,
    };
    public ev: {
        hp: number,
        att: number,
        def: number,
        satt: number,
        sdef: number,
        speed: number,
    };
    public baseExp: number;
    public type1: Type;
    public type2: Type;
    public height: number;
    public weight: number;
    public shiny: boolean;
    public trainer: Trainer;
    public ot: Trainer;
    constructor(id: number, apiId: number, name: string, nickname: string, moves: Move[], sprite: any, nature: Nature, hp: number, level: number, exp: number, stats: any, base: any, iv: any, ev: any, baseExp: number, type1: Type, type2: Type, height: number, weight: number, shiny: boolean, trainer: Trainer, ot: Trainer) {
        this.id = id;
        this.apiId = apiId;
        this.name = name;
        this.nickname = nickname;
        this.moves = moves;
        this.sprite = sprite;
        this.nature = nature;
        this.hp = hp;
        this.level = level;
        this.exp = exp;
        this.stats = stats;
        this.base = base;
        this.iv = iv;
        this.ev = ev;
        this.baseExp = baseExp;
        this.type1 = type1;
        this.type2 = type2;
        this.height = height;
        this.weight = weight;
        this.shiny = shiny;
        this.trainer = trainer;
        this.ot = ot;
    }

}