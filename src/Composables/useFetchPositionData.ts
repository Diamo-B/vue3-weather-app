import { Ref, ref } from "vue";
import { Coordinates } from "../types/Coordinates";
import { PositionDataApiResponse } from "../types/apis/PositionData";
import { PositionDetails } from "../types/PositionDetails";

export default function useFetchPositionData(
    userCoordinates: Ref<Coordinates | undefined>,
    customCoordinates: Ref<Coordinates|undefined>,
    loading: Ref<boolean>
) {
    let positionDetails: Ref<PositionDetails | undefined> = ref(undefined);
    let error: Ref<string | undefined> = ref(undefined);
    
    const fetchPositionData = () => {
        const activeCoordinates = customCoordinates.value ? customCoordinates : userCoordinates
        
        if (activeCoordinates.value) {
            loading.value = true;
            fetch(
                "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
                activeCoordinates.value.latitude +
                "&longitude=" +
                activeCoordinates.value.longitude,
                {
                    method: "get",
                }
                )
                .then(async (data) => {
                    const response: PositionDataApiResponse = await data.json();
                    
                    positionDetails.value = {
                        city: response.city,
                        country: {
                            name: response.countryName,
                            code: response.countryCode,
                        },
                        locality: response.locality,
                        lat: activeCoordinates.value!.latitude,
                        lon: activeCoordinates.value!.longitude,
                    };
                    loading.value = false;
                })
                .catch((err) => {
                    error.value = err.message;
                    loading.value = false;
                });
            }
    };
    
    
    return { positionDetails, error, fetchPositionData };
}
