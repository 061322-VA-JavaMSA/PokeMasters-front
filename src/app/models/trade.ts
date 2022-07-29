import { Pokemon } from "./pokemon";
import { Trainer } from "./trainer";

export class Trade {
    public id: number;
    public status: Status;
    public listed: Pokemon;
    public offered: Pokemon;
    public requestedId: number;
    public range: number;
    public owner: Trainer;

    constructor(id: number, status: Status, listed: Pokemon, offered: Pokemon, requestedId: number, range: number, owner: Trainer) {
        this.id = id;
        this. status = status;
        this.listed = listed;
        this.offered = offered;
        this.requestedId = requestedId;
        this.range = range;
        this.owner = owner;
    }
}

export enum Status {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    COMPLETED = 'COMPLETED'
}