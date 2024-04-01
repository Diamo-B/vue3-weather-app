<script setup lang="ts">
import { Ref, watch, ref } from "vue";
import useTrackingAuthorization from "./Composables/useTrackingAuthorization";
import useFetchPositionData from "./Composables/useFetchPositionData";
import chooseBackgroundImage from "./utils/chooseBackgroundImage";
import Loading from "./components/Loading.vue";
import Error from "./components/Error.vue";
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import ErrorType from "./types/Error";
import { WeatherDescription } from "./types/weatherDescription";
import { Coordinates } from "./types/Coordinates";
//==============================================================================================

const loading: Ref<boolean> = ref(true);
const errors: Ref<ErrorType | undefined> = ref();

/* 
? this will be used to store the coordinates in case the user types a city in the location input, otherwise the UserCoordinates will hold the current user's position
*/  
const customCoordinates: Ref<Coordinates|undefined> = ref();
function setCustomCoordinates (lat:number,lon:number) {
  customCoordinates.value = {
    latitude:lat,
    longitude:lon
  }
}

/* Step1: getting user's coordinates */
const { UserCoordinates, error: positionTrackingError } =
  useTrackingAuthorization(loading);

/* Step2: getting position data */
const {
  positionDetails,
  error: positionDetailsError,
  fetchPositionData,
} = useFetchPositionData(UserCoordinates, customCoordinates, loading);


const weatherDescription: Ref<WeatherDescription | undefined> = ref();

const setErrors = (title: string, err: string) => {
  errors.value = { title, message: err };
};

const setWeatherDescription = (desc: WeatherDescription) => {
  weatherDescription.value = desc;
};


watch([UserCoordinates, customCoordinates], () => {
  fetchPositionData()
});

watch(positionDetails,()=>console.log(positionDetails))

watch([positionTrackingError, positionDetailsError], () => {
  errors.value = {
    title: "Could not determine your location",
    message: positionDetailsError.value || positionTrackingError.value,
  };
});

const {bgName, selectBackground} = chooseBackgroundImage(weatherDescription)

watch(weatherDescription,()=>{
    selectBackground()
});
</script>

<template>
  <div class="w-full h-full max-h-dvh overflow-hidden">
    <div v-if="loading" class="bg-slate-800/70 w-full h-full">
      <Loading />
    </div>
    <div v-if="errors" class="bg-slate-800/70 h-full w-full">
      <Error :title="errors.title" :message="errors.message!" />
    </div>
    <div
      v-if="!errors && positionDetails"
      class="w-full h-full grid grid-cols-4 pr-5 bg-auto 2xl:bg-cover bg-no-repeat bg-center"
      :style="{ 'background-image': 'url(/' + bgName + ')' }"
    >
      <LeftPanel
        v-bind:key="positionDetails?.city"
        :position-details="positionDetails"
        :setErrors="setErrors"
        :weatherDescription="weatherDescription"
      />
      <RightPanel
        v-bind:key="positionDetails?.city"
        :positionDetails="positionDetails"
        :setErrors="setErrors"
        :setWeatherDescription="setWeatherDescription"
        :setCustomCoordinates="setCustomCoordinates"
      />
    </div>
  </div>
</template>