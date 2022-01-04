<template>
  <div class="container">
    <div class="row">
      <div class="card mb-3 col-lg-6 col-md-6 col-sm-12">
        <div class="card-body">
          <h5 class="card-title">{{ departement.nomDep }}</h5>
          <span
            ><p class="card-text">
              Code Departement: {{ departement.dep }}
            </p></span
          >
          <p class="card-text">Region: {{ departement.reg }}</p>
          <span>
            <p v-if ="departement.chefLieu" class="card-text">
                Chef de Lieu: <router-link :to="'/lieux/'+ this.departement.chefLieu.codeInsee">{{ departement.chefLieu.nomCom }}</router-link> 
            </p>
        </span>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h3>
          List lieux in  {{ departement.nomDep }}
        </h3>
        <ul v-if="lieux">
          <li v-for="lieu in lieux" :key="lieu">
            <router-link :to="'/lieux/' + lieu.codeInsee">{{
              lieu.nomCom
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DepartementService from "../services/departement.services";
export default {
  name: "CelebriteDetails",
  data() {
    return {
      lieux: "",
      departement: "",
    };
  },
  mounted() {
    DepartementService.getDetails(this.$route.params.numDep).then(
      (response) => {
        this.departement = response.data;
      },
      (error) => {
        this.departement =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    DepartementService.getLieuxbyDepartement(this.$route.params.numDep).then(
      (response) => {
        this.lieux = response.data;
      },
      (error) => {
        this.lieux =
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
</style>
