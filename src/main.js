import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import "leaflet/dist/leaflet.css"
import { L } from "@vue-leaflet/vue-leaflet";
import {mapboxgl} from "mapbox-gl";


createApp(App)
  .use(router)
  .use(store)
  .use(L)
  .use(mapboxgl)
  .component("font-awesome-icon", FontAwesomeIcon)
  
  .mount("#app");
