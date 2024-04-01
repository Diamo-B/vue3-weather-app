type LocalNames = {
    [key: string]: string;
}

export interface CityGeocodingApiResponse {
    country:string,
    lat:number,
    lon:number,
    name:string,
    local_names:LocalNames[],
    state?:string
}