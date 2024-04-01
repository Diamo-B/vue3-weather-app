import { Ref, ref } from "vue";
import { WeatherDescription } from "../types/weatherDescription";

export default function chooseBackgroundImage(
  weatherDescription: Ref<WeatherDescription | undefined>
) {
  const bgName: Ref<string | undefined> = ref();

  const selectBackground = () => {
    if (weatherDescription.value!==undefined) {
        const type: number = Math.floor(weatherDescription.value.id / 100);
      switch (type) {
        case 2:
          bgName.value= "stormy.jpg";
          break;
        case 3:
            bgName.value= "drizzle.jpg";
          break;
        case 5:
            bgName.value= "heavyRain.jpg";
          break;
        case 6:
            bgName.value= "snow.jpg";
          break;
        case 7:
            bgName.value= "fog.jpg";
          break;
        case 8:
            bgName.value= 
            weatherDescription.value.id == 800 ? "clear.jpg" : "cloudy.jpg"
          ;
          break;
      } 
    }
  };

  return { selectBackground, bgName };
}
