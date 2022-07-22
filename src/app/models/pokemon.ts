import { Stat } from "./stat";
import { Trainer } from "./trainer";

export class Pokemon {
    public id: number;
    public apiId: number;
    public spriteFront: string;
    public spriteBack: string;
    public nickname: string;
    public level: number;
    public exp: number;
    public stats: Stat[];
    public trainer: Trainer;
    public ot: Trainer;
    constructor(id: number, apiId: number, spriteFront: string, spriteBack: string, nickname: string,  level: number, exp: number, stats: Stat[], trainer: Trainer, ot: Trainer) {
        this.id = id;
        this.apiId = apiId;

        this.spriteFront = spriteFront;
        this.spriteBack = spriteBack;
        console.log(this.spriteBack);
        this.nickname = nickname;
        this.level = level;
        this.exp = exp;
        this.stats = stats;
        this.trainer = trainer;
        this.ot = ot;
    }
}