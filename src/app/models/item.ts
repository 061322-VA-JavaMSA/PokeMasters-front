export class Item {
    public id: number;
    public name: String;
    public cost: number;
    public effect: String;
    public type: String;
    public sprite: String;

    constructor(id: number, name: String, cost: number, effect: String, type: String, sprite: String) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        if(type == null) {
            this.type = "pokemon"
        } else {
            this.type = type;
        }
        this.sprite = sprite;
    }
}