<script setup lang="ts">
import { PositionDetails } from "../../types/PositionDetails";
import { MainData } from "../../types/RightPanel/MainStats";

const { positionDetails, mainData } = defineProps<{
  positionDetails: PositionDetails;
  mainData: MainData;
}>();
const { city, country, locality } = positionDetails;
const { feelsLike, highest, lowest, iconName } = mainData;
</script>

<template>
  <div>
    <h1 class="font-bold text-center text-2xl text-white mt-5">
      {{ locality }}
    </h1>
    <h2 class="font-bold text-center text-lg text-white mt-2">
      {{ city }}, {{ country.name }}
    </h2>
    <div class="text-center">
      <v-icon :name="iconName" scale="5" class="text-white mx-auto" />
      <p class="font-bold text-white text-4xl">{{ feelsLike }}℃</p>
    </div>
    <div class="mx-12 flex justify-between">
      <div class="text-xl font-bold text-white text-center">
        <v-icon
          name="wi-thermometer-exterior"
          scale="2"
          class="text-white mx-auto"
        />
        <p>{{ lowest }}℃</p>
      </div>
      <div class="text-xl font-bold text-white text-center">
        <v-icon name="wi-thermometer" scale="2" class="text-white mx-auto" />
        <p>{{ highest }}℃</p>
      </div>
    </div>
  </div>
</template>
