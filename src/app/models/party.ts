import { Pokemon } from "./pokemon";

export class Party {
    public id: number;
    public pokemon: Pokemon[];

    constructor(id: number, pokemon: Pokemon[]) {
        this.id = id;
        this.pokemon = pokemon;
    }
}