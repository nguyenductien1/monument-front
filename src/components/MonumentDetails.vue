/* eslint-disable no-undef */
<template>
  <div class="container">
    <div class="row row-details-monument">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card mb-3">
          <img
            v-if="monument.photoUrl"
            class="card-img-top"
            :src="monument.photoUrl"
            :alt="monument.nomM"
          />
          <img
            v-else
            class="card-img-top"
            src="../assets/img/no-photo.jpg"
            :alt="monument.nomM"
          />
          <div class="card-body">
            <h5 class="card-title">{{ monument.nomM }}</h5>
            <span
              ><p class="card-text">Type: {{ monument.typeMonument }}</p></span
            >
            <p class="card-text">Propriétaire: {{ monument.proprietaire }}</p>
            <span
              ><p class="card-text">
                Longitude: {{ monument.longitude }}
              </p></span
            >
            <p class="card-text">Latitude: {{ monument.latitude }}</p>
            <p v-if="monument.lieu" class="card-text">
              Situé à: <router-link :to="'/lieux/' + monument.lieu.codeInsee">{{ monument.lieu.nomCom }}</router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h3>List of Celebrites in {{ monument.nomM }}</h3>
        <ul v-if="monument.celebrities">
          <li v-for="celebrite in monument.celebrities" :key="celebrite">
            <router-link :to="'/celebrites/' + celebrite.numCelebrite"
              >{{ celebrite.nom }} {{ celebrite.prenom }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script>
import MonumentService from "../services/monument.services";
import mapboxgl from "mapbox-gl";

export default {
  name: "MonumentDetails",
  data() {
    return {
      monument: "",
      accessToken:
        "pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ",
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ";
    MonumentService.getDetails(this.$route.params.codeM).then(
      (response) => {
        this.monument = response.data;
        //Mapbox
        const map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [this.monument.latitude, this.monument.longitude],
          zoom: 18,
        });
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-right");

        const marker = new mapboxgl.Marker().setLngLat([
          this.monument.latitude,
          this.monument.longitude,
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
        this.monument =
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
#mapContainer {
  height: 300px;
}
ul > li {
  list-style-type: disc;
}
li:hover {
  color: beige;
}
.card-img-top {
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
</style>
