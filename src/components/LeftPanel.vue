<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import ForecastItem from "./LeftPanel/ForecastItem.vue"
import ForecastItemSkelton from "./skeltons/ForecastItemSkelton.vue";
import { PositionDetails } from "../types/PositionDetails";
import {WeatherDescription} from "../types/weatherDescription";
import useFetchForecastData from "../Composables/LeftPanel/useFetchForecastData";

type Props = {
  positionDetails: PositionDetails;
  setErrors: (title: string, err: string) => void;
  weatherDescription: WeatherDescription | undefined;
};
const props = defineProps<Props>();

/* Step 4: getting current position forecast weather data */
const {forecastData, fetchForecastData} = useFetchForecastData(props.positionDetails)

const currentDateTime: Ref<string> = ref("");
onMounted(() => {
  dayjs.extend(customParseFormat);
  dayjs.extend(weekday);
  currentDateTime.value = dayjs().format("dddd D MMMM YYYY | HH:mm A");
  
  fetchForecastData();
});
</script>
<template>
  <section class="col-span-3 flex flex-col">
    <div class="h-4/6 2xl:h-5/6 p-12 flex flex-col justify-between">
      <h2 class="font-bold text-xl text-right text-white">
        {{ currentDateTime }}
      </h2>

      <div class="flex justify-end">
        <div
          v-if="!weatherDescription"
          class="skeleton h-10 w-2/3 bg-slate-700/70"
        ></div>
        <h1 v-else class="text-6xl Font-Roboto  text-white font-semibold capitalize">{{weatherDescription.description}}</h1>
      </div>
    </div>
    <div
      class="flex-1 border-4 bg-slate-500/40 border-white mx-5 mb-5 p-5 rounded-xl grid grid-cols-5 gap-5"
    >
        <ForecastItemSkelton v-for="i in Array(4)" :key="i" v-if="forecastData.length==0"/>
        <ForecastItem v-else v-for="item in forecastData" :key="uuidv4()" :item="item"/>
    </div>
  </section>
</template>
