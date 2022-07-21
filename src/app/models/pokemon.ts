export class Pokemon {
    public id: number;
    public apiId: number;
    public nickname: string;
    public hp: number;
    public attack: number;
    public defense: number;
    public sAttack: number;
    public sDefense: number;
    public speed: number;
    public exp: number;
    public level: number;
    constructor(id: number, apiId: number, nickname: string, hp: number, attack: number, defense: number, sAttack: number, sDefense: number, speed: number, exp: number, level: number) {
        this.id = id;
        this.apiId = apiId;
        this.nickname = nickname;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.sAttack = sAttack;
        this.sDefense = sDefense;
        this.speed = speed;
        this.exp = exp;
        this.level = level;
    }
}