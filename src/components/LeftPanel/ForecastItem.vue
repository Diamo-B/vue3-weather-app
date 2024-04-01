<script setup lang="ts">
import { forecastData } from "../../types/apis/forecastData";
import chooseIcon from "../../utils/chooseIcon";

const props = defineProps<{ item: forecastData }>();
</script>

<template>
  <div
    class="border border-white rounded-xl grid grid-cols-1 place-content-center p-5 text-white"
  >
    <h1 class="text-center font-bold ">{{ props.item.weekday }}</h1>
    <v-icon :name="chooseIcon(item.most_common_weather)" scale="3.7" class="text-white mx-auto" />
    <div class="flex justify-evenly gap-5 font-bold">
      <div class="flex flex-col justify-center items-center">
        <v-icon
          name="wi-thermometer-exterior"
          scale="1.5"
          class="text-white"
        />
        <p>{{ props.item.temp_min_avg }}℃</p>
      </div>
      <div class="flex flex-col justify-center items-center">
        <v-icon
          name="wi-thermometer"
          scale="1.5"
          class="text-white"
        />
        <p>{{ props.item.temp_max_avg }}℃</p>
      </div>
    </div>
  </div>
</template>
