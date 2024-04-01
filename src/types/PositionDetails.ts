export type Country = {
    name: string;
    code: string;
};

export interface PositionDetails{
    city: string;
    country: Country;
    locality: string;
    lat: number,
    lon:number
}
