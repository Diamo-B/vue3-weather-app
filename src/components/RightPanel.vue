<script setup lang="ts">
import { onMounted } from "vue";
import { PositionDetails } from "../types/PositionDetails";
import Input from "./RightPanel/Input.vue";
import MainStats from "./RightPanel/MainStats.vue";
import OtherStats from "./RightPanel/OtherStats.vue";
import MainStatsSkeleton from "./skeltons/RightPanel/MainStatsSkeleton.vue";
import OtherStatsSkeleton from "./skeltons/RightPanel/OtherStatsSkeleton.vue";
import useFetchCurrentWeatherData from "../Composables/RightPanel/useFetchCurrentWeather.ts";
import { WeatherDescription } from "../types/weatherDescription";

type Props = {
  positionDetails: PositionDetails;
  setErrors: (title: string, err: string) => void;
  setWeatherDescription: (desc: WeatherDescription) => void;
  setCustomCoordinates: (lat:number,lon:number) => void;
};

const props = defineProps<Props>();

/* Step 3: getting current position current weather data */
const { fetchWeatherData, loading, mainData, otherStats } =
  useFetchCurrentWeatherData(
    props.positionDetails,
    props.setErrors,
    props.setWeatherDescription
  );

onMounted(() => {
  fetchWeatherData();
});
</script>

<template>
  <section
    class="w-full flex flex-col justify-center my-auto relative h-full py-5"
  >
    <div
      class="h-fit flex-1 2xl:flex 2xl:flex-col w-full mr-5 rounded-lg bg-slate-500/40 border-2 py-5"
    >
      <!-- Skeleton -->
      <div class="flex flex-col h-full" v-if="loading">
        <MainStatsSkeleton />
        <div class="border-2 w-[90%] mx-auto my-2"></div>
        <OtherStatsSkeleton />
      </div>

      <!-- Data -->
      <div v-else>
        <Input :setCustomCoordinates="props.setCustomCoordinates"/>
        <MainStats :position-details="positionDetails" :mainData="mainData!" />
        <div class="border-2 w-[90%] mx-auto my-2"></div>
        <OtherStats :stats="otherStats!" />
      </div>
    </div>
  </section>
</template>
../types/RightPanel/weatherDescription.ts
