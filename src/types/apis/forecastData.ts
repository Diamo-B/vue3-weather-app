import {
  Clouds,
  Main,
  Rain_Snow,
  Weather,
  Wind,
} from "../../types/apis/currentWeatherData";

export interface ForecastDataApiResponse {
  city: {
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: rawForecastData[];
  message: number;
}

export interface rawForecastData {
  clouds: Clouds;
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  rain?: Rain_Snow;
  snow?: Rain_Snow;
  sys?: {
    pod: string;
  };
  visibility: number;
  weather: Weather[];
  wind: Wind;
}



export interface forecastData 
{
    date: string;
    weekday: string;
    feels_like_avg: number;
    temp_min_avg: number;
    temp_max_avg: number;
    most_common_weather: string;
}