<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Find monument(s)</h3>
      <div class="row row-parameter-search">
        <div class="col-lg-3 col-md-3 col-sm-12 search-by-departement">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="departement-search"
              v-model="searchQueryDepartements"
              placeholder="Saisiez un departement ..."
            />
            <div class="show-search-list" id="list_departement">
              <ul>
                <li
                  v-for="departement in resultQueryDepartement"
                  :key="departement.dep"
                  :id="departement.dep"
                  v-on:click="getLieuxByDepartement(departement)"
                >
                  {{ departement.nomDep }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 search-by-lieu">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="lieu-search"
              v-model="searchQueryLieux"
              placeholder="Saisiez un lieu ..."
            />
            <div class="show-search-list" id="list_lieux">
              <ul>
                <li
                  v-for="lieu in resultQueryLieux"
                  :key="lieu.codeInsee"
                  v-on:click="getMonumentsByLieu(lieu)"
                >
                  {{ lieu.nomCom }}-{{ lieu.codeInsee }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-3 col-sm-12 btn-search">
          <button type="button" class="btn btn-primary" v-on:click="showTableMonument()">Search</button>
        </div>
      </div>
      <h3>Distance calculate between two monuments</h3>
      <div class="row row-parameter-search">
        <div class="col-lg-3 col-md-3 col-sm-12 search-by-monument">
          <div class="form-group">
            <label for="monument-search-A">Point A:</label>
            <input
              type="text"
              class="form-control monument-search"
              id="monument-search-A" 
              v-model="searchQueryMonumentA"
              placeholder="Saisiez premier monument ..."
            />
            <div class="show-search-list" id="list_monument_A">
              <ul>
                <li
                  v-for="monument in resultQueryMonumentsA"
                  :key="monument.nomM"
                  :id="monument.codeM"
                  v-on:click="setMonumentA(monument)"
                >
                  {{ monument.nomM }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 search-by-monument">
          <div class="form-group">
            <label for="monument-search-B">Point B:</label>
            <input
              type="text"
              class="form-control monument-search"
              id="monument-search-B"
              v-model="searchQueryMonumentB"
              placeholder="Saisiez deuxieme monument ..."
            />
            <div class="show-search-list" id="list_monument_B">
              <ul>
                <li
                  v-for="monument in resultQueryMonumentsB"
                  :key="monument.codeInsee"
                  v-on:click="setMonumentB(monument)"
                >
                  {{ monument.nomM }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 mode-direction">
          <label for="mode-direction">Select mode: </label>
          <select class="form-control select-mode" v-model="modeDirection" name="mode-direction" id="mode-direction">
            <option value="mapbox/driving" selected="selected">Driving</option>
            <option value="mapbox/walking">Walking</option>
            <option value="mapbox/cycling">Cycling</option>
          </select>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 btn-get-distance">
          <button type="button" class="btn btn-primary" v-on:click="showDirection">Get Distance</button>
        </div>
      </div>
    </header>
    
    <div v-if="isShowTableMonument" class="panel panel-default table-container">
      <div class="panel-heading">Monuments</div>
      <div class="panel-body">
        <div class="table-responsive">
          <table class="table table-striped table-bordered" id="dataTable">
            <thead>
              <tr>
                <th class="text-right">#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Proprietaire</th>
                <th>Lieu</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(monument, index) in displayedMonuments"
                :key="monument.codeM"
              >
                <td class="text-right">
                  {{ perPage * (page - 1) + index + 1 }}
                </td>
                <td>
                  <span class="picture">
                    <img
                      v-if="monument.photoUrl"
                      :src="monument.photoUrl"
                      :alt="monument.nomM"
                      class="img-circle"
                    />
                    <img
                      v-else
                      src="../assets/img/no-photo.jpg"
                      :alt="monument.nomM"
                      class="img-circle"
                    />
                  </span>
                  <span
                    ><router-link :to="'/monuments/' + monument.codeM">{{
                      monument.nomM
                    }}</router-link></span
                  >
                </td>
                <td>{{ monument.typeMonument }}</td>
                <td>{{ monument.proprietaire }}</td>
                <td v-if="monument.lieu">{{ monument.lieu.nomCom }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="isShowTableMonument" class="text-center" aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li>
          <a href="#" @click="page = 1" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li>
          <a href="#" v-if="page != 1" @click="page--" aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li
          v-for="pageNumber in pages.slice(page - 1, page + 4)"
          :key="pageNumber"
          :class="{ active: page === pageNumber }"
        >
          <a href="#" @click="page = pageNumber">{{ pageNumber }}</a>
        </li>
        <li>
          <a
            href="#"
            @click="page++"
            v-if="page < pages.length"
            aria-label="Next"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li>
          <a href="#" @click="page = pages.length" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!--Map-->
    <div class="row row-map" id='map'></div>
  </div>
</template>

<script>
import MonumentService from "../services/monument.services";
import LieuService from "../services/lieu.services";
import DepartementService from "../services/departement.services";
import CelebriteService from "../services/celebrite.services";
import $ from "jquery";
import leaflet from "leaflet"
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css';



let departement = {
  dep: "",
  nomDep: "",
  chefLieu: {
    codeInsee: "",
    dep: "",
    latitude: "",
    longitude: "",
    nomCom: "",
  },
  reg: "",
};
let lieu = {
  codeInsee: "",
  dep: "",
  latitude: "",
  longitude: "",
  nomCom: "",
};
let monument = {
  codeM: "",
  nomM: "",
  lieu: {
    codeInsee: "",
    dep: "",
    latitude: "",
    longitude: "",
    nomCom: "",
  },
  longitude: "",
  latitude: "",
  photoUrl: "",
  proprietaire: "",
  typeMonument: "",
  celebrite: [],
};
let celebrite = {
  numCelebrite: "",
  nom: "",
  prenom: "",
  nationalite: "",
  epoque: "",
  photoUrl: "",
};



export default {
  name: "User",
  data() {
    return {
      monuments: [],
      monumentsFiltre: [],
      monument: monument,
      lieux: [],
      lieuxFiltre: [],
      lieu: lieu,
      departements: "",
      departementsFiltre: "",
      departement: departement,
      celebrites: "",
      celebrite: celebrite,
      content: "",
      searchQueryDepartements: "",
      searchQueryLieux: "",
      searchQueryMonuments: "",
      page: 1,
      perPage: 10,
      pages: [],
      loading: true,
      searchQueryMonumentA:"",
      searchQueryMonumentB:"",
      monumentA:monument,
      monumentB:monument,
      accessToken: 'pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ',
      isShowTableMonument:false,
      isShowMap:false,
      modeDirection:""
    };
  },
  mounted() {
    MonumentService.getAllMonuments().then(
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
    LieuService.getAllLieux().then(
      (response) => {
        this.lieux = response.data;
        this.lieuxFiltre = this.lieux;
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
    DepartementService.getAllDepartements().then(
      (response) => {
        this.departements = response.data;
      },
      (error) => {
        this.departements =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    CelebriteService.getAllCelebrites().then(
      (response) => {
        this.celebrites = response.data;
      },
      (error) => {
        this.celebrites =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    
   
    
  },
  computed: {
    resultQueryDepartement() {
      $("#departement-search").change($("#list_departement").fadeIn());
      if (this.searchQueryDepartements) {
        return this.departements.filter((departement) => {
          return this.searchQueryDepartements
            .toLowerCase()
            .split(" ")
            .every((v) => departement.nomDep.toLowerCase().includes(v));
        });
      } else {
        return null;
      }
    },
    resultQueryLieux() {
      $("#lieu-search").change($("#list_lieux").fadeIn());
      if (this.searchQueryLieux) {
        return this.lieuxFiltre.filter((lieu) => {
          return this.searchQueryLieux
            .toLowerCase()
            .split(" ")
            .every((v) => lieu.nomCom.toLowerCase().includes(v));
        });
      } else {
        return null;
      }
    },
    resultQueryMonumentsA() {
      $("#monument-search-A").change($("#list_monument_A").fadeIn());
      if (this.searchQueryMonumentA) {
        return this.monuments.filter((monument) => {
          return this.searchQueryMonumentA
            .toLowerCase()
            .split(" ")
            .every((v) => monument.nomM.toLowerCase().includes(v));
        });
      } else {
        return null;
      }
    },
    resultQueryMonumentsB() {
      $("#monument-search-B").change($("#list_monument_B").fadeIn());
      if (this.searchQueryMonumentB) {
        return this.monuments.filter((monument) => {
          return this.searchQueryMonumentB
            .toLowerCase()
            .split(" ")
            .every((v) => monument.nomM.toLowerCase().includes(v));
            
        });
        
      } else {
        return null;
      }
      
    },
    displayedMonuments() {
        return this.paginate(this.monumentsFiltre);
    },
  },
  watch: {
    monuments() {
      this.setPages();
    },
  },
  methods: {
    getLieuxByDepartement(departement) {
      if (departement) {
        let codeDep = departement.dep;
        $("#list_departement").fadeOut();
        this.searchQueryDepartements = departement.nomDep;
        this.departement = departement;
        this.lieuxFiltre = this.lieux.filter((lieu) => {
          return codeDep
            .toLowerCase()
            .split(" ")
            .every((v) => lieu.dep.toLowerCase().includes(v));
        });
      } else {
        this.lieuxFiltre = this.lieux;
      }
    },
    getMonumentsByLieu(lieu) {
      if (lieu) {
        var codeInseeF = lieu.codeInsee;
        $("#list_lieux").fadeOut();
        this.searchQueryLieux = lieu.nomCom;
        this.lieu = lieu;
        var i = 0;
        this.monumentsFiltre = [];
        for (i = 0; i < this.monuments.length; i++) {
          if (this.monuments[i].lieu) {
            if (this.monuments[i].lieu.codeInsee == codeInseeF) {
              this.monumentsFiltre.push(this.monuments[i]);
            }
          }
        }
      }
    },
    setPages() {
      var numberOfPages = Math.ceil(this.monuments.length / this.perPage);
      for (var index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(monuments) {
      var page = this.page;
      var perPage = this.perPage;
      var from = page * perPage - perPage;
      var to = page * perPage;
      return monuments.slice(from, to);
    },
    setMonumentA(monumentA){
      this.searchQueryMonumentA = monumentA.nomM;
      this.monumentA = monumentA;
      $("#list_monument_A").fadeOut();
    },
    setMonumentB(monumentB){
      this.searchQueryMonumentB = monumentB.nomM;
      this.monumentB = monumentB;
      $("#list_monument_B").fadeOut();
    },
    showTableMonument(){
      this.isShowTableMonument=!this.isShowTableMonument;
    },
    showMap(){
      this.isShowMap=!this.isShowMap;
    },
    showDirection(){
    
    if(this.monumentA.nomM !== "" && this.monumentB !== ""){
    this.showMap();
    var latitudeA = this.monumentA.latitude;
    var longitudeA = this.monumentA.longitude;
    var latitudeB = this.monumentB.latitude;
    var longitudeB = this.monumentB.longitude;

    var map = leaflet.map('map').setView([longitudeA, latitudeA], 20);
      
    leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+this.accessToken, {
          attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1, 
          accessToken: this.accessToken
    }).addTo(map);
    
    leaflet.Routing.control({
                    router: leaflet.Routing.mapbox(this.accessToken,{
                        profile : this.modeDirection,
                        language: 'fr',
                    }),
                    waypoints: [
                        leaflet.latLng(longitudeA, latitudeA),
                        leaflet.latLng(longitudeB, latitudeB)
                    ],
                }).addTo(map);
    }
    else{
      alert("Please choose two monuments");
    }
    
    }
  },
};
</script>
<style scoped>
.show-search-list {
  position: absolute;
  widows: auto;
  z-index: 999;
  width: 235px;
}

ul {
  margin-top: 0px;
  background: #fff;
  color: #000;
  list-style-type: none;
  padding: 0;
  max-height: 4.5em; /* 1.5 x 3 */
  overflow-y: auto;
}

li {
  padding: 12px;
  cursor: pointer;
  color: black;
  line-height: 1em;
}

li:hover {
  background: #f0f0f0;
}
.container {
  margin-top: 10px;
}

.table-container {
  margin: 10px;
}
.table-container .panel-heading {
  font-weight: bold;
}
.table-container .panel-body {
  padding: 0;
}
.table-container table {
  margin-bottom: 0;
  border: none;
}
.table-container table tr:last-child td {
  border-bottom: none;
}
.table-container table tr th {
  font-weight: bold;
}
.table-container table tr th:first-child,
.table-container table tr td:first-child {
  border-left: none;
}
.table-container table tr th:last-child,
.table-container table tr td:last-child {
  border-right: none;
}
.table-container table tr td {
  padding: 2px 8px !important;
  vertical-align: middle;
}
.table-container table tr td .picture {
  padding-right: 10px;
}
.table-container table tr td img {
  max-height: 30px;
  width: auto;
  border: 1px solid #c7c7c7;
}
.btn-get-distance{
  margin-top: 32px;
}
#map { 
  width:100%; 
  height:400px; 
  }
</style>
