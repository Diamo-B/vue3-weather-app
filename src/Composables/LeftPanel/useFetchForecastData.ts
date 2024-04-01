import { Ref, ref } from "vue";
import { ForecastDataApiResponse, forecastData, rawForecastData } from "../../types/apis/forecastData";
import { PositionDetails } from "../../types/PositionDetails";
import dayjs from "dayjs";

export default function useFetchForecastData(positionDetails:PositionDetails) {
   const forecastData:Ref<forecastData[]> = ref([])

    const fetchForecastData = () => {
        if (positionDetails) {
            fetch(
                import.meta.env.VITE_API_FORECAST_WEATHER_URL +
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
                    const response:ForecastDataApiResponse = await data.json();
                    forecastData.value = handleForecastData(response.list);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const handleForecastData = (weatherList:rawForecastData[]) : forecastData[] => {
        // Object to store aggregated data for each day
        const aggregatedData:any = {};

        // Iterate through the weather objects
        weatherList.forEach((item:any) => {
            // Parse date into YYYY-MM-DD format
            const date = dayjs(item.dt_txt, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD"
            );

            // If date not in aggregatedData, initialize it
            if (!aggregatedData[date]) {
                aggregatedData[date] = {
                    feels_like: [],
                    temp_min: [],
                    temp_max: [],
                    weather_main: [],
                };
            }

            // Append values for aggregation
            aggregatedData[date].feels_like.push(item.main.feels_like);
            aggregatedData[date].temp_min.push(item.main.temp_min);
            aggregatedData[date].temp_max.push(item.main.temp_max);
            aggregatedData[date].weather_main.push(item.weather[0].main);
        });

        // Final list to store aggregated data for each day
        const finalList = [];

        // Iterate through aggregatedData
        for (const date in aggregatedData) {
            if (aggregatedData.hasOwnProperty(date)) {
                // Calculate averages
                const feelsLikeAvg =
                    aggregatedData[date].feels_like.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].feels_like.length;
                const tempMinAvg =
                    aggregatedData[date].temp_min.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].temp_min.length;
                const tempMaxAvg =
                    aggregatedData[date].temp_max.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].temp_max.length;

                // Find the most common weather condition
                const mostCommonWeather = aggregatedData[
                    date
                ].weather_main.reduce((acc: any, val: any) => {
                    acc[val] = (acc[val] || 0) + 1;
                    return acc;
                }, {});

                const mostCommonWeatherKey = Object.keys(
                    mostCommonWeather
                ).reduce((a, b) =>
                    mostCommonWeather[a] > mostCommonWeather[b] ? a : b
                );

                // Get the weekday name
                const weekdayName = dayjs(date).format("dddd");

                // Create a new object for the day's aggregated data
                const dayAggregatedData = {
                    date: date,
                    weekday: weekdayName,
                    feels_like_avg: parseFloat(feelsLikeAvg.toFixed(2)),
                    temp_min_avg: parseFloat(tempMinAvg.toFixed(2)),
                    temp_max_avg: parseFloat(tempMaxAvg.toFixed(2)),
                    most_common_weather: mostCommonWeatherKey,
                };

                // Append to the final list
                finalList.push(dayAggregatedData);
            }
        }

        return finalList.slice(1); //slice 1 removes the current day from the list
    };

    return {
        forecastData,
        fetchForecastData
    }
};