import { Ref, ref } from "vue";
import { CityGeocodingApiResponse } from "../types/apis/cityGeocoding";

export default function useCityGeolocation(location: Ref<string>) {
  const options:Ref<Omit<CityGeocodingApiResponse, "local_names" | "state">[] | undefined> = ref()
  const fetchCityData = () => {
    fetch(
      "/api/geo/1.0/direct?q=" +
        location.value +
        "&limit=5&appid=" +
        import.meta.env.VITE_API_KEY,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const response: CityGeocodingApiResponse[] = await res.json();
        options.value = response.map((item:CityGeocodingApiResponse)=>{
          return {
            country: item.country,
            lat: item.lat,
            lon: item.lon,
            name: item.name
          }
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function clearOptions() {
    options.value = undefined
  }

  return {fetchCityData, clearOptions, options}

}
