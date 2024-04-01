import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { WiCloudy , WiDayRain ,BiCloudDrizzle, WiStormShowers ,WiSunset, WiSunrise, WiSnowflakeCold, WiHumidity, WiRaindrop, MdVisibilityOutlined, CoLocationPin, WiThermometer, WiNightRainWind, WiThermometerExterior, WiStrongWind, WiCloudyGusts, RiMistFill , WiSmoke ,BiCloudHaze , GiDustCloud , BiCloudFog2 , GiSandstorm, GiSmokingVolcano  ,GiTornado,  WiDaySunny , WiCloud , WiNa  } from "oh-vue-icons/icons";

addIcons(WiCloudy , WiDayRain ,BiCloudDrizzle ,WiStormShowers , WiSunset, WiSunrise, WiSnowflakeCold, WiHumidity, WiRaindrop, MdVisibilityOutlined, CoLocationPin, WiNightRainWind, WiThermometerExterior, WiThermometer, WiStrongWind, WiCloudyGusts, RiMistFill, WiSmoke ,BiCloudHaze  , GiDustCloud  , BiCloudFog2, GiSandstorm ,GiSmokingVolcano ,GiTornado, WiDaySunny, WiCloud , WiNa   );

createApp(App).component("v-icon",OhVueIcon).mount('#app')
