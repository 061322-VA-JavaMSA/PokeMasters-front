import { EV } from "./ev";
import { IV } from "./iv";
import { Nature } from "./nature.enum";
import { Stat } from "./stat";
import { Trainer } from "./trainer";

export class Pokemon {
    public id: number;
    public apiId: number;
    public nickname: string;
    public gender: Gender;
    public nature: Nature;
    public hp: number;
    public level: number;
    public exp: number;
    public iv: IV;
    public ev: EV;
    public shiny: boolean;
    public stat: Stat = new Stat(0, 0, 0, 0, 0, 0, 0);
    public trainer: Trainer;
    public ot: Trainer;
    public sprite: {
        front: string;
        back: string;
        front_a: string;
        back_a: string;
    } = { front: '', back: '', front_a: '', back_a: '' };
    public data: any;
    constructor(id: number, apiId: number, nickname: string, gender: Gender, nature: Nature, hp: number, level: number, exp: number, iv: IV, ev: EV, shiny: boolean, trainer: Trainer, ot: Trainer) {
        this.id = id;
        this.apiId = apiId;
        this.nickname = nickname;
        this.gender = gender;
        this.nature = nature;
        this.hp = hp;
        this.level = level;
        this.exp = exp;
        this.iv = iv;
        this.ev = ev;
        this.shiny = shiny;
        this.trainer = trainer;
        this.ot = ot;
    }

    populate() {
        let sprites = this.data['sprites']['versions']['generation-v']['black-white'];
        if (this.gender == Gender.FEMALE) {
            if (this.shiny) {
                this.sprite.front = sprites.front_shiny_female || sprites.front_shiny;
                this.sprite.back = sprites.back_shiny_female || sprites.back_shiny;
                this.sprite.front_a = sprites.animated.front_shiny_female || sprites.animated.front_shiny;
                this.sprite.back_a = sprites.animated.back_shiny_female || sprites.animated.back_shiny;
            } else {
                this.sprite.front = sprites.front_female || sprites.front_default;
                this.sprite.back = sprites.back_female || sprites.back_default;
                this.sprite.front_a = sprites.animated.front_female || sprites.animated.front_default;
                this.sprite.back_a = sprites.animated.back_female || sprites.animated.back_default;
            }
        } else {
            if (this.shiny) {
                this.sprite.front = sprites.front_shiny;
                this.sprite.back = sprites.back_shiny;
                this.sprite.front_a = sprites.animated.front_shiny;
                this.sprite.back_a = sprites.animated.back_shiny;
            } else {
                this.sprite.front = sprites.front_default;
                this.sprite.back = sprites.back_default;
                this.sprite.front_a = sprites.animated.front_default;
                this.sprite.back_a = sprites.animated.back_default;
            }
        }

        let base: any[] = this.data.stats;
        base.forEach(stat => {
            let name: string = '';
            let iv: number = 0;
            let ev: number = 0;
            switch (stat.stat.name) {
                case 'hp': name = 'hp'; iv = this.iv.hp; ev = this.ev.hp; break;
                case 'attack': name = 'att'; iv = this.iv.att; ev = this.ev.att; break;
                case 'defense': name = 'def'; iv = this.iv.def; ev = this.ev.def; break;
                case 'special-attack': name = 'satt'; iv = this.iv.satt; ev = this.ev.satt; break;
                case 'special-defense': name = 'sdef'; iv = this.iv.sdef; ev = this.ev.sdef; break;
                case 'speed': name = 'speed'; iv = this.iv.speed; ev = this.ev.speed; break;
                default:
            }
            this.calculateStat(name, stat.base_stat, iv, ev)
        })

    }

    calculateStat(name: string, b: number, i: number, e: number) {
        let stat: number = ((2 * b + i + Math.floor(e / 4)) * this.level) / 100;
        if (name === 'hp') {
            stat = Math.floor(stat + this.level + 10);
        } else {
            let n = this.getNatureMod(name);
            stat = Math.floor((stat + 5) * n);
        }
    }

    getNatureMod(s: string) {
        switch (s) {
            case 'att':
                switch (this.nature) {
                    case Nature.LONELY, Nature.BRAVE, Nature.ADAMANT, Nature.NAUGHTY: return 1.1;
                    case Nature.BOLD, Nature.TIMID, Nature.MODEST, Nature.CALM: return 0.9;
                    default: return 1.0;
                }
            case 'def':
                switch (this.nature) {
                    case Nature.BOLD, Nature.RELAXED, Nature.IMPISH, Nature.LAX: return 1.1;
                    case Nature.LONELY, Nature.HASTY, Nature.MILD, Nature.GENTLE: return 0.9;
                    default: return 1.0;
                }
                case 'satt':
                switch (this.nature) {
                    case Nature.MODEST, Nature.MILD, Nature.QUIET, Nature.RASH: return 1.1;
                    case Nature.ADAMANT, Nature.IMPISH, Nature.JOLLY, Nature.CAREFUL: return 0.9;
                    default: return 1.0;
                }
                case 'sdef':
                switch (this.nature) {
                    case Nature.CALM, Nature.GENTLE, Nature.SASSY, Nature.CAREFUL: return 1.1;
                    case Nature.NAUGHTY, Nature.LAX, Nature.NAIVE, Nature.RASH: return 0.9;
                    default: return 1.0;
                }
                case 'speed':
                switch (this.nature) {
                    case Nature.TIMID, Nature.HASTY, Nature.JOLLY, Nature.NAIVE: return 1.1;
                    case Nature.BRAVE, Nature.RELAXED, Nature.QUIET, Nature.SASSY: return 0.9;
                    default: return 1.0;
                }
            default: return 1.0;
        }
    }

}

export enum Gender {
    MALE = '♂',
    FEMALE = '♀',
    NONE = ''
}