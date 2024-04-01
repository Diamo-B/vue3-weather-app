<script setup lang="ts">
import { ref } from "vue";
import useCityGeolocation from "../../Composables/useCityGeolocation";
import { v4 as uuidv4 } from "uuid";
import { CityGeocodingApiResponse } from "../../types/apis/cityGeocoding";
//=========================================================================================

type Props = { setCustomCoordinates: (lat: number, lon: number) => void };

const {setCustomCoordinates} = defineProps<Props>();

const location = ref("");
const { fetchCityData, clearOptions, options } = useCityGeolocation(location);
let debouncedSearch: number;

function handleInput() {
  clearTimeout(debouncedSearch);
  if (location.value.length > 0)
    debouncedSearch = setTimeout(() => {
      fetchCityData();
    }, 500);
  else clearOptions();
}

function chooseCustomLocation(item: Omit<CityGeocodingApiResponse, "local_names" | "state">) {
    setCustomCoordinates(item.lat, item.lon);
    clearOptions();
}
</script>
<template>
  <label
    class="input input-bordered bg-transparent border-white border-2 flex items-center gap-2 mx-10 relative"
  >
    <v-icon
      name="co-location-pin"
      scale="2"
      class="absolute left-1 text-white"
    />
    <input
      type="text"
      class="font-bold pl-7 text-white text-lg placeholder:text-white placeholder:font-semibold placeholder:text-base"
      placeholder="Location"
      v-model="location"
      @input="handleInput"
    />
  </label>
  <div class="w-full absolute" v-show="options && options.length > 0">
    <ul class="menu bg-base-200 w-56 rounded-box mx-auto">
      <li
        v-for="item in options"
        :key="uuidv4()"
        class="text-base font-semibold"
      >
        <a @click="chooseCustomLocation(item)">{{ item.name }}, {{ item.country }}</a>
      </li>
    </ul>
  </div>
</template>
../../Composables/useCityGeolocation
