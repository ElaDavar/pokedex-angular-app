export abstract class Pokemon {
    id!: number;
    name!: string;
    types!: string;
    species!: string;
    baseExperience!: number;
    height!: number;
    weight!: number;
    stats!: [];
    sprites!: any;
}