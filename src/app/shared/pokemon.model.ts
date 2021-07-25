export abstract class Pokemon {
    id!: number;
    name!: string;
    types!: string;
    species!: string;
    baseExperience!: number;
    height!: number;
    weight!: number;
    stats!: [];
    buy!: boolean;
    wish!: boolean;
}