import { Damage } from "./damage.enum";
import { Type } from "./type.enum";

export class Move {
    public id: number;
    public name: string;
    public type: Type;
    public power: number;
    public currentPP: number;
    public maxPP: number;
    public accuracy: number;
    public damage: Damage;

    constructor(id: number, name: string, type: Type, power: number, currentPP: number, maxPP: number, accuracy: number, damage: Damage) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.currentPP = currentPP;
        this.maxPP = maxPP;
        this.accuracy = accuracy;
        this.damage = damage;
    }
}