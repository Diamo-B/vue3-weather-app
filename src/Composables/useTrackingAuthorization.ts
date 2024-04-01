import { Ref, onMounted, ref } from "vue";
import { Coordinates } from "../types/Coordinates";

export default function useTrackingAuthorization(loading:Ref<boolean>) {
  const UserCoordinates: Ref<Coordinates|undefined> = ref();
  const error: Ref<string|undefined> = ref()

  const RetrieveUserPosition = (): void => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              UserCoordinates.value ={
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
                loading.value = false
            },
            (err) => {
              error.value = err.message;
              loading.value = false;
              return;
            }
        );
    } else {
        error.value = "Geolocation is not supported by your browser.";
        loading.value = false;
        return;
    }
  };

  onMounted(RetrieveUserPosition)

  return { UserCoordinates, error }
}