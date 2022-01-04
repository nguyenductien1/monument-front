<template>
  <div class="container">
    <div class="row">
      <div class="card mb-3 col-lg-6 col-md-6 col-sm-12">
        <div class="card-body">
          <h5 class="card-title">{{ lieu.nomCom }}</h5>
          <span
            ><p class="card-text">
              Code Insee: {{ lieu.codeInsee }}
            </p></span
          >
          <p class="card-text">Longitude: {{ lieu.longitude }}</p>
          <span
            ><p class="card-text">Latitude: {{ lieu.latitude }}</p></span
          >
          <span>
            <p class="card-text">
                Departement: <router-link :to="'/departements/'+lieu.dep">{{lieu.dep}}</router-link> 
            </p>
        </span>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h3>
          List monuments in  {{ lieu.nomCom }}
        </h3>
        <ul v-if="monuments">
          <li v-for="monument in monuments" :key="monument">
            <router-link :to="'/monuments/' + monument.codeM">{{
              monument.nomM
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script>
import LieuService from "../services/lieu.services";
import mapboxgl from "mapbox-gl";
export default {
  name: "CelebriteDetails",
  data() {
    return {
      lieu: "",
      monuments: "",
      accessToken:
        "pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    LieuService.getDetails(this.$route.params.codeInsee).then(
      (response) => {
        this.lieu = response.data;
        const map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [this.lieu.latitude, this.lieu.longitude],
          zoom: 12,
        });
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-right");

        const marker = new mapboxgl.Marker().setLngLat([
          this.lieu.latitude,
          this.lieu.longitude,
        ]);
        marker.addTo(map);

        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });

        map.addControl(geolocate, "top-right");
      },
      (error) => {
        this.lieu =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    LieuService.getMonumentsbyLieu(this.$route.params.codeInsee).then(
      (response) => {
        this.monuments = response.data;
      },
      (error) => {
        this.monuments =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    
  },
};
</script>
<style scoped>
ul > li {
  list-style-type: disc;
}
.card-img-top {
  height: 60%;
  width: 60%;
  object-fit: cover;
}
ul {
  margin-top: 0px;
  background: #fff;
  color: #000;
  list-style-type: none;
  padding: 0;
  max-height: 15em; 
  overflow-y: auto;
}
#mapContainer {
  height: 300px;
}
</style>
