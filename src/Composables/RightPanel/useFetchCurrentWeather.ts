import { Ref, ref } from "vue";
import { PositionDetails } from "../../types/PositionDetails";
import { CurrentWeatherDataApiResponse } from "../../types/apis/currentWeatherData";
import { OtherStats } from "../../types/RightPanel/OtherStats";
import { WeatherDescription } from "../../types/weatherDescription";
import { MainData } from "../../types/RightPanel/MainStats";
import chooseIcon from "../../utils/chooseIcon.ts";

export default function useFetchCurrentWeatherData(
    positionDetails: PositionDetails,
    setErrors:(title:string, err:string)=>void,
    setWeatherDescription:(desc:WeatherDescription)=>void
) {
    const mainData: Ref<MainData | undefined> = ref();
    const otherStats: Ref<OtherStats | undefined> = ref();
    const loading: Ref<boolean> = ref(true);

    const fetchWeatherData = () => {
        if (positionDetails) {
            fetch(
                import.meta.env.VITE_API_CURRENT_WEATHER_URL +
                    "?lat=" +
                    positionDetails?.lat +
                    "&lon=" +
                    positionDetails?.lon +
                    "&units=metric&APPID=" +
                    import.meta.env.VITE_API_KEY,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(async (data) => {
                    const response: CurrentWeatherDataApiResponse =
                        await data.json();
                    mainData.value = {
                        feelsLike: response.main.feels_like,
                        lowest: response.main.temp_min,
                        highest: response.main.temp_max,
                        iconName:chooseIcon(response.weather[0].main)
                    };
                    otherStats.value = {
                        windSpeed: response.wind.speed,
                        humidityRate: response.main.humidity,
                        visibility: response.visibility,
                        rain: response.rain
                            ? response.rain["1h" || "3h"]
                            : undefined,
                        snow: response.snow
                            ? response.snow["1h" || "3h"]
                            : undefined,
                        unixSunrise: response.sys.sunrise,
                        unixSunset: response.sys.sunset,
                    };
                    setWeatherDescription( {
                        id: response.weather[0].id,
                        condition: response.weather[0].main,
                        description: response.weather[0].description,
                    });
                    loading.value = false;
                })
                .catch((err) => {
                    setErrors("We could not fetch the current weather", err.message);
                    console.error(err);
                    loading.value = false;
                });
        }

    };
    return {
        mainData,
        otherStats,
        loading,
        fetchWeatherData,
    };
}
