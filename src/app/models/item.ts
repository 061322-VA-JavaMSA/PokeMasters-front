export class Item {
    public id: number;
    public name: String;
    public cost: number;
    public effect: String;
    public sprite: String;

    constructor(id: number, name: String, cost: number, effect: String, sprite: String) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.sprite = sprite;
    }
}