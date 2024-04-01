export default function chooseIcon(weatherState: string): string {
  switch (weatherState) {
    case "Thunderstorm":
      return "wi-storm-showers";
    case "Drizzle":
      return "bi-cloud-drizzle";
    case "Rain":
      return "wi-day-rain";
    case "Snow":
      return "wi-snowflake-cold";
    case "Mist":
      return "ri-mist-fill";
    case "Smoke":
      return "wi-smoke";
    case "Haze":
      return "bi-cloud-haze";
    case "Dust":
      return "gi-dust-cloud";
    case "Squall":
      return "gi-dust-cloud";
    case "Fog":
      return "bi-cloud-fog2";
    case "Sand":
      return "gi-sandstorm";
    case "ash":
      return "gi-smoking-volcano";
    case "Tornado":
      return "gi-tornado";
    case "Clear":
      return "wi-day-sunny";
    case "Clouds":
      return "wi-cloudy";
    default:
      return "wi-na";
  }
}
