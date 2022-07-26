export interface ApiPoke {
    base_experience: number;
    height: number;
    id: number;
    moves: any[];
    name: string;
    sprites: ApiSprite[];
    stats: ApiStat[];
    types: ApiType[];
    weight: number;
}

export interface ApiSprite {
    versions: {
        'generation-v': {
            'black-white': {
                animated: {
                    back_default: string;
                    back_female: string;
                    back_shiny: string;
                    front_default: string;
                    front_female: string;
                    front_shiny: string;
                    front_shiny_female: string;
                }
            }
        }
    }
}

export interface ApiStat {
    base_stat: number;
    effort: number;
    name: string;
    stat: {
        name: string;
        url: string;
    };
}

export interface ApiType {
    slot: number;
    name: string;
}