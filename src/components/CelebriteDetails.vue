<template>
  <div class="container">
    <div class="row">
      <div class="card mb-3 col-lg-6 col-md-6 col-sm-12">
        <img
          v-if="celebrite.photoUrl"
          class="card-img-top"
          :src="celebrite.photoUrl"
          :alt="celebrite.nom"
        />
        <img
          v-else
          class="card-img-top"
          src="../assets/img/no-photo.jpg"
          :alt="celebrite.nom"
        />
        <div class="card-body">
          <h5 class="card-title">{{ celebrite.nom }} {{ celebrite.prenom }}</h5>
          <span
            ><p class="card-text">
              Célébrite Number: {{ celebrite.numCelebrite }}
            </p></span
          >
          <p class="card-text">Nationality: {{ celebrite.nationalite }}</p>
          <span
            ><p class="card-text">Epoque: {{ celebrite.epoque }}</p></span
          >
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h3>
          List monuments which has celebrite of {{ celebrite.nom }}
          {{ celebrite.prenom }}
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
  </div>
</template>

<script>
import CelebriteService from "../services/celebrite.services";

export default {
  name: "CelebriteDetails",
  data() {
    return {
      celebrite: "",
      monuments: "",
    };
  },
  mounted() {
    CelebriteService.getDetails(this.$route.params.numCelebrite).then(
      (response) => {
        this.celebrite = response.data;
      },
      (error) => {
        this.celebrite =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    CelebriteService.getMonuments(this.$route.params.numCelebrite).then(
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
</style>
