import { Pokemon } from "./pokemon";

export class Storage {
    public id: number;
    public boxes: Box[];
    public activeIndex: number;

    constructor(id: number, boxes: Box[], activeIndex: number) {
        this.id = id;
        this.boxes = boxes;
        this.activeIndex = activeIndex;
    }
}

export class Box {
    public id: number;
    public name: string;
    public pokemon: Pokemon[];

    constructor(id: number, name: string, pokemon: Pokemon[]) {
        this.id = id;
        this.name = name;
        this.pokemon = pokemon;
    }
}