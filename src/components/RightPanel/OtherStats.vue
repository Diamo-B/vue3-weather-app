<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs";
import { OtherStats } from "../../types/RightPanel/OtherStats";
const props = defineProps<{ stats: OtherStats }>();
const {
  humidityRate,
  unixSunrise,
  unixSunset,
  visibility,
  windSpeed,
  rain,
  snow,
} = props.stats;
const sunrise: Ref<string> = ref("");
const sunset: Ref<string> = ref("");

onMounted(() => {
  dayjs.extend(customParseFormat);
  sunrise.value = dayjs.unix(unixSunrise).format("HH:mm");
  sunset.value = dayjs.unix(unixSunset).format("HH:mm");
});
</script>

<template>
  <div
    class="grid grid-cols-2 border-2 rounded-lg mx-5 text-white font-bold text-center 2xl:mt-2"
  >
    <div class="border py-3">
      <div class="flex justify-center items-center gap-1">
        <v-icon name="wi-strong-wind" scale="1.5" class="text-white" />
        <p>Wind</p>
      </div>
      <p>
        {{
          windSpeed > 1000
            ? Math.floor(windSpeed * 3.6).toFixed(2) + " Km/h"
            : windSpeed + " m/s"
        }}
      </p>
    </div>
    <div class="border py-4">
      <div class="flex justify-center items-center gap-1">
        <v-icon name="md-visibility-outlined" scale="1" class="text-white" />
        <p>Visibility</p>
      </div>
      <p>{{ (visibility * 0.001).toFixed(2) }} Km</p>
    </div>
    <div class="border py-3 relative">
      <div
        v-if="!rain"
        class="absolute h-full w-full top-0 left-0 bg-slate-800/70"
      ></div>

      <div v-else-if="snow !== undefined">
        <div class="flex justify-center items-center gap-1">
          <v-icon name="wi-snowflake-cold" scale="1.5" class="text-white" />
          <p>Snow</p>
        </div>
        <p>{{ snow }}mm</p>
      </div>
      <div v-else>
        <div class="flex justify-center items-center gap-1">
          <v-icon name="wi-raindrop" scale="1.5" class="text-white" />
          <p>Rain</p>
        </div>
        <p>{{ rain ? rain : "----" }} mm</p>
      </div>
    </div>
    <div class="border py-3">
      <div class="flex justify-center items-center">
        <v-icon name="wi-humidity" scale="1.5" class="text-white" />
        <p>Humidity</p>
      </div>
      <p>{{ humidityRate }}%</p>
    </div>
    <div class="border py-3">
      <div class="flex justify-center items-center gap-1">
        <v-icon name="wi-sunrise" scale="1.5" class="text-white" />
        <p>Sunrise</p>
      </div>
      <p>{{ sunrise }}</p>
    </div>
    <div class="border py-3">
      <div class="flex justify-center items-center gap-1">
        <v-icon name="wi-sunset" scale="1.5" class="text-white" />
        <p>Sunset</p>
      </div>
      <p>{{ sunset }}</p>
    </div>
  </div>
</template>
