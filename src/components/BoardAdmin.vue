<template>
  <div class="container main-modification">
    <div class="row">
        <div class="col-lg-6 col-md-6">
            <div class="container departement-modification">
                <div class="row title-modification-departement">
                    <h4>Manage departements</h4>
                </div>
                <div class="row container">
                    <div class="form-group">
                        <input type="text" class="form-control" id="departement"  v-model="searchQueryDeptements" placeholder="Saisiez un departement ...">
                        <div class="show-search-list" id="liste_departement">
                            <ul>
                                <li v-for="departement in resultQueryDepartement" :key="departement.dep" :id="departement.dep" v-on:click="showUpdateDepartement(departement)">{{ departement.nomDep }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row btn-add-departement">
                    <button class="btn btn-primary btn-add-departement" v-on:click="showAddDepartement">Add departement</button>
                </div>
                
            </div>

            <div class="container lieu-modification">
                <div class="row title-lieu-departement">
                    <h4>Manage lieux</h4>
                </div>
                <div class="row container">
                    <div class="form-group">
                        <input type="text" class="form-control" id="lieu" v-model="searchQueryLieux" placeholder="Saisiez un lieu ...">
                        <div class="show-search-list" id="liste_lieux">
                            <ul>
                                <li v-for="lieu in resultQueryLieux" :key="lieu.codeInsee" v-on:click="showUpdateLieu(lieu)">{{ lieu.nomCom }}-{{lieu.codeInsee }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row btn-add-lieu">
                    <button class="btn btn-primary btn-add-lieu" v-on:click="showAddLieu">Add lieu</button>
                </div>
                
            </div>

            <div class="container monument-modification">
                <div class="row title-modification-monument">
                    <h4>Manage monuments</h4>
                </div>
                <div class="row container">
                    <div class="form-group">
                        <input type="text" class="form-control" id="monument" v-model="searchQueryMonuments"  placeholder="Saisiez un monument ...">
                        <div class="show-search-list" id="liste_monuments">
                            <ul>
                                <li v-for="monument in resultQueryMonuments" :key="monument.codeM" v-on:click="showUpdateMonument(monument)">{{ monument.nomM }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row btn-add-monument">
                    <button class="btn btn-primary btn-add-monument" v-on:click="showAddMonument">Add monument</button>
                </div>
                
            </div>

            <div class="container celebrite-modification">
                <div class="row title-modification-celebrite">
                    <h4>Manage celebrites</h4>
                </div>
                <div class="row container">
                    <div class="form-group">
                        <input type="text" class="form-control" id="celebrite" v-model="searchQueryCelebrites"  placeholder="Saisiez un celebrite ...">
                        <div class="show-search-list" id="liste_celebrites">
                            <ul>
                                <li v-for="celebrite in resultQueryCelebrites" :key="celebrite.nom" v-on:click="showUpdateCelebrite(celebrite)">{{ celebrite.nom }} {{celebrite.prenom}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row btn-add-celebrite">
                    <button class="btn btn-primary btn-add-celebrite" v-on:click="showAddCelebrite()">Add celebrite</button>
                </div>
                
            </div>
        </div>  
        <div class="col-lg-6 col-md-6">
            <!--Form for Departement-->
            <div class="container-fluid form-edit-departement" v-if="isShowModDepartement || isShowNewDepartement">
                <h4 class="title-form-departement">Modification or Create new Departement</h4>
                <form >
                    <div class="form-row">
                        <div class="col col-code-departement">
                            <input type="text" class="form-control" v-model="departement.dep" placeholder="Code">
                        </div>
                        <div class="col col-nom-departement">
                            <input type="text" class="form-control" v-model="departement.nomDep" placeholder="Nom département">
                        </div>
                        
                    </div>
                    <div class="form-row">
                        
                        <div class="col col-chef-lieu">
                            <input v-if="departement.chefLieu"  type="text" class="form-control" v-model="departement.chefLieu.codeInsee" placeholder="Chef Lieu">
                            <input v-else  type="text" class="form-control" v-model="departement.chefLieu" placeholder="Chef Lieu">
                            
                        </div>
                        <div class="col col-region">
                            <input type="text" class="form-control" v-model="departement.reg" placeholder="Region">
                        </div>
                    </div>
                    <button type="button" v-if="isShowModDepartement" class="btn-primary btn-update-departement" v-on:click="updateDepartement()">Update</button>
                    <button type="button" v-if="isShowNewDepartement" class="btn-primary btn-create-departement" v-on:click="createNewDepartement()">Create</button>
                    <button type="button" v-if="isShowModDepartement" class="btn-danger btn-delete-departement" v-on:click="deleteDepartement()">Delete</button>
                </form>
            </div>
            <!--Form for Lieu-->
            <div class="container-fluid form-edit-lieu" v-if="isShowModLieu || isShowNewLieu">
                <h4 class="title-form-departement">Modification or Create new Lieu</h4>
                <form >
                    <div class="form-row">
                        <div class="col col-code-insee">
                            <label for="lieu-code-insee">Code Insee:</label>
                            <input type="text" class="form-control" id="lieu-code-insee" v-model="lieu.codeInsee" placeholder="Code Insee">
                        </div>
                        <div class="col col-nom-lieu">
                            <label for="lieu-nom-commun">Nom Com:</label>
                            <input type="text" class="form-control" id="lieu-nom-commun" v-model="lieu.nomCom" placeholder="Nom Lieu">
                        </div>
                        <div class="col col-code-dep">
                            <label for="lieu-dep">Dep:</label>
                            <input type="text" class="form-control" id="lieu-dep" v-model="lieu.dep" placeholder="Code Departement">
                        </div>
                        
                    </div>
                    <div class="form-row">
                        
                        <div class="col col-longitude">
                            <label for="lieu-longitude">Longitude:</label>
                            <input type="text" class="form-control" id="lieu-longitude" v-model="lieu.longitude" placeholder="Longitude">
                            
                        </div>
                        <div class="col col-latitude">
                            <label for="lieu-latitude">Latitude:</label>
                            <input type="text" class="form-control" id="lieu-latitude" v-model="lieu.latitude" placeholder="Latitude">
                        </div>
                    </div>
                    <button type="button" v-if="isShowModLieu" class="btn-primary btn-update-lieu" v-on:click="updateLieu()">Update</button>
                    <button type="button" v-if="isShowNewLieu" class="btn-primary btn-create-lieu" v-on:click="createNewLieu()">Create</button>
                    <button type="button" v-if="isShowModLieu" class="btn-danger btn-delete-lieu" v-on:click="deleteLieu()">Delete</button>
                </form>
            </div>
            <!--Form for Monument-->
            <div class="container-fluid form-edit-monument" v-if="isShowModMonument || isShowNewMonument">
                <h4 class="title-form-departement">Modification or Create new Monument</h4>
                <form >
                    <div class="form-row">
                        <div class="col col-code-monument">
                            <label for="monument-code-insee">Code Monument:</label>
                            <input type="text" class="form-control" id="monument-code-monument" v-model="monument.codeM" placeholder="Code Monument">
                        </div>
                        <div class="col col-monument-lieu">
                            <label for="monument-lieu">Lieu:</label>
                            <input type="text" class="form-control" id="monument-lieu" v-model="monument.lieu.codeInsee" placeholder="Code Lieu">
                        </div>
                        
                    </div>
                    <div class="form-row">

                        <div class="col col-nom-monument">
                            <label for="monument-nom-commun">Nom Monument:</label>
                            <input type="text" class="form-control" id="monument-nom-monument" v-model="monument.nomM" placeholder="Nom Monument">
                        </div>
                        
                    </div>
                    <div class="form-row">

                        <div class="col col-monument-proprietaire">
                            <label for="monument-nom-commun">Proprietaire:</label>
                            <input type="text" class="form-control" id="monument-proprietaire" v-model="monument.proprietaire" placeholder="Proprietaire">
                        </div>
                        <div class="col col-monument-type-monument">
                            <label for="monument-nom-commun">Type:</label>
                            <input type="text" class="form-control" id="monument-monument-type" v-model="monument.typeMonument" placeholder="Type Monument">
                        </div>
                        
                    </div>
                    <div class="form-row">
                        
                        <div class="col col-monument-longitude">
                            <label for="monument-longitude">Longitude:</label>
                            <input type="text" class="form-control" id="monument-longitude" v-model="monument.longitude" placeholder="Longitude">
                            
                        </div>
                        <div class="col col-monument-latitude">
                            <label for="monument-latitude">Latitude:</label>
                            <input type="text" class="form-control" id="monument-latitude" v-model="monument.latitude" placeholder="Latitude">
                        </div>
                    </div>
                    <div class="form-row">
                        
                        <div class="col-10 col-monument-photo-url">
                            <label for="monument-photo-url">Photo URL:</label>
                            <input type="text" class="form-control" id="monument-photo-url" v-model="monument.photoUrl" placeholder="Photo URL">
                            
                        </div>
                    </div>
                    <div class="form-row">
                        
                        <div class="col-9 col-monument-choose-upload">
                            <input type="file" class="form-control" ref="uploadPhoto" @change="onPhotoUpload()" accepte="image/*" id="monument-upload-photo"  placeholder="Choose photo to upload">
                            <button type="button" @click="startUpload(this.typeM)">Start Upload</button>
                        </div>
                        
                    </div>
                    
                    <div class="col-9 col-photo-monument-preview">
                        <img  class="img-thumbnail photo-preview " height="300" width="300" :src="monument.photoUrl">
                    </div>
                    <button type="button" v-if="isShowModMonument" class="btn-primary btn-update-monument" v-on:click="updateMonument()">Update</button>
                    <button type="button" v-if="isShowNewMonument" class="btn-primary btn-create-monument" v-on:click="createNewMonument()">Create</button>
                    <button type="button" v-if="isShowModMonument" class="btn-danger btn-delete-monument" v-on:click="deleteMonument()">Delete</button>
                </form>
            </div>
                <!--Form for Celebrite-->
            <div class="container-fluid form-edit-celebrite" v-if="isShowModCelebrite || isShowNewCelebrite">
                <h4 class="title-form-departement">Modification or Create new Celebirite</h4>
                <form >
                    <div class="form-row">
                        <div class="col col-nom-celebrite">
                            <label for="celebrite-nom">Nom:</label>
                            <input type="text" class="form-control" id="celebrite-nom" v-model="celebrite.nom" placeholder="Nom">
                        </div>
                        
                    </div>
                    <div class="form-row">

                        <div class="col col-celebrite-prenom">
                            <label for="celebrite-prenom">Prénom:</label>
                            <input type="text" class="form-control" id="celebrite-prenom" v-model="celebrite.prenom" placeholder="Prénom">
                        </div>
                        
                    </div>
                    <div class="form-row">

                        <div class="col col-celebrite-num-celebite">
                            <label for="celebrite-num">Num Celebrite:</label>
                            <input type="text" class="form-control" id="celebrite-num" v-model="celebrite.numCelebrite" placeholder="Num Célébrite" readonly="readonly">
                        </div>
                        <div class="col col-celebrite-nationalite">
                            <label for="celebrite-nationalite">Nationality:</label>
                            <input type="text" class="form-control" id="celebrite-nationalite" v-model="celebrite.nationalite" placeholder="Nationalité">
                        </div>
                        
                    </div>
                    
                    <div class="form-row">
                        
                        <div class="col-10 col-celebrite-photo-url">
                            <label for="celebrite-photo-url">Photo URL:</label>
                            <input type="text" class="form-control" id="celebrite-photo-url" v-model="celebrite.photoUrl" placeholder="Photo URL">
                            
                        </div>
                    </div>
                    <div class="form-row">
                        
                        <div class="col col-celebrite-choose-upload">
                            <input type="file" class="form-control" ref="uploadPhoto" @change="onPhotoUpload()" accepte="image/*" id="celebrite-upload-photo"  placeholder="Choose photo to upload">
                            <button type="button" @click="startUpload(this.typeC)">Start Upload</button>
                        </div>
                        
                    </div>
                    
                    <div class="col-9 col-photo-celebrite-preview">
                        <img  class="img-thumbnail photo-preview " height="300" width="300" :src="celebrite.photoUrl">
                    </div>
                    <button type="button" v-if="isShowModCelebrite" class="btn-primary btn-update-celebrite" v-on:click="updateCelebrite()">Update</button>
                    <button type="button" v-if="isShowNewCelebrite" class="btn-primary btn-create-celebrite" v-on:click="createNewCelebrite()">Create</button>
                    <button type="button" v-if="isShowModCelebrite" class="btn-danger btn-delete-celebrite" v-on:click="deleteCelebrite()">Delete</button>
                </form>
            </div>

            <div id="mapContainer" class="basemap"></div>
        </div>      
    </div>
  </div>
</template>

<script>
import MonumentService from "../services/monument.services";
import LieuService from "../services/lieu.services";
import DepartementService from "../services/departement.services";
import CelebriteService from "../services/celebrite.services";
import $ from "jquery";
import mapboxgl from "mapbox-gl";
import axios from 'axios';

//import fireStorage from "../main";
let departement ={
      dep:"",
      nomDep:"",
      chefLieu:{
          codeInsee:"",
          dep:"",
          latitude:"",
          longitude:"",
          nomCom:""
      },
      reg:""
  }
let lieu ={
    codeInsee:"",
    dep:"",
    latitude:"",
    longitude:"",
    nomCom:""
}
let monument={
    codeM:"",
    nomM:"",
    lieu:{
        codeInsee:"",
        dep:"",
        latitude:"",
        longitude:"",
        nomCom:""
    },
    longitude:"",
    latitude:"",
    photoUrl:"",
    proprietaire:"",
    typeMonument:"",
    celebrite:[],
}
let celebrite={
    numCelebrite:"",
    nom: "",
    prenom: "",
    nationalite:"",
    epoque: "",
    photoUrl: "",

}
const typeM= "m"
const typeC= "c"
export default {

  name: "BoardAdmin",
  
  data() {
    return {
      monuments: "",
      monument:monument,
      lieux:"",
      lieu:lieu,
      departements:"",
      departement:departement,
      celebrites:"",
      celebrite:celebrite,
      isShowModDepartement: false,
      isShowNewDepartement: false,
      isShowModLieu: false,
      isShowNewLieu: false,
      isShowModMonument: false,
      isShowNewMonument: false,
      isShowModCelebrite: false,
      isShowNewCelebrite: false,
      searchQueryDeptements: null,
      searchQueryLieux: null,
      searchQueryMonuments: null,
      searchQueryCelebrites: null,
      photoMonument: "",
      photoData:null,
      formData:null,
      typeM:typeM,
      typeC:typeC,
      accessToken: 'pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ',
    };
  },
  mounted() {
    MonumentService.getAllMonuments().then(
      (response) => {
        console.log(response.data);
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
        console.log(response.data);
        this.lieux = response.data;
      },
      (error) => {
        this.lieux =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      },
      
    );
    DepartementService.getAllDepartements().then(
      (response) => {
        console.log(response.data);
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
        console.log(response.data);
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
    resultQueryDepartement(){
        $("#departement").change(
            $("#liste_departement").fadeIn()
        );
        if(this.searchQueryDeptements){
            return this.departements.filter((departement)=>{
            return this.searchQueryDeptements.toLowerCase().split(' ').every(v => departement.nomDep.toLowerCase().includes(v))
            })
        }else{
            return null;
        }
    },
    resultQueryLieux(){
        $("#lieu").change(
            $("#liste_lieux").fadeIn()
        );
        if(this.searchQueryLieux){
            return this.lieux.filter((lieu)=>{
            return this.searchQueryLieux.toLowerCase().split(' ').every(v => lieu.nomCom.toLowerCase().includes(v))
            })
        }else{
            return null;
        }
    },
    resultQueryMonuments(){
        $("#monument").change(
            $("#liste_monuments").fadeIn()
        );
        if(this.searchQueryMonuments){
            return this.monuments.filter((monument)=>{
            return this.searchQueryMonuments.toLowerCase().split(' ').every(v => monument.nomM.toLowerCase().includes(v))
            })
        }else{
            return null;
        }
    },
    resultQueryCelebrites(){
        $("#celebrite").change(
            $("#liste_celebrites").fadeIn()
        );
        if(this.searchQueryCelebrites){
            return this.celebrites.filter((celebrite)=>{
            return this.searchQueryCelebrites.toLowerCase().split(' ').every(v => celebrite.nom.toLowerCase().includes(v))
            })
        }else{
            return null;
        }
    },
   
    
  },
  watch:{

  },
  methods: {

      //methods for departement
       showAddDepartement(){
            return this.isShowNewDepartement=!this.isShowNewDepartement ;
        },
        showUpdateDepartement(departement){
            this.isShowModDepartement=true;
            this.departement = departement;
            if (this.departement.chefLieu == null){
                departement.chefLieu = {
                    codeInsee:"",
                    dep:"",
                    latitude:"",
                    longitude:"",
                    nomCom:""
                }
            }
            console.log(departement);
            this.searchQueryDeptements = departement.nomDep;
            $("#liste_departement").fadeOut();
            
        },
        createNewDepartement(){
            
            DepartementService.addDepartement(this.departement);
            
        },
        updateDepartement(){
            
            DepartementService.editDepartement(this.departement.dep, this.departement.chefLieu.codeInsee);
            
        },
        deleteDepartement(){
            
            DepartementService.deleteDepartement(this.departement.dep);
            
        },
        //methods for lieu
        showAddLieu(){
            return this.isShowNewLieu = !this.isShowNewLieu;
        },
        showUpdateLieu(lieu){
            this.isShowModLieu = !this.isShowModLieu;
            this.lieu =lieu;
            this.searchQueryLieux = lieu.nomCom;
            $("#liste_lieux").fadeOut();

            mapboxgl.accessToken = this.accessToken;
            const map= new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [this.lieu.latitude, this.lieu.longitude],
            zoom: 18,
            
            });
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, "top-right");

            const marker = new mapboxgl.Marker().setLngLat([this.lieu.latitude, this.lieu.longitude])
            marker.addTo(map);

            const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
            });

            map.addControl(geolocate, "top-right")
        }, 
        createNewLieu(){
            LieuService.addLieu(this.lieu);
        },
        updateLieu(){
            LieuService.editLieu(this.lieu.codeInsee, this.lieu);
        },
        deleteLieu(){
            LieuService.deleteLieu(this.lieu.codeInsee);
        },
        //methods for monuments
        showAddMonument(){
            this.isShowNewMonument = !this.isShowNewMonument;
        },
        showUpdateMonument(monument){
            this.isShowModMonument = !this.isShowModMonument;
            this.monument = monument;
            this.searchQueryMonuments = this.monument.nomM;
            $("#liste_monuments").fadeOut();

        },
        createNewMonument(){
            console.log(this.monument);
            MonumentService.addMonument(this.monument);
        },
        updateMonument(){
            MonumentService.editMonument(this.monument.codeM, this.monument);
        },
        deleteMonument(){
            MonumentService.deleteMonument(this.monument);
        },
        
        //For celebrites
        showAddCelebrite(){
            console.log("ok")
            this.isShowNewCelebrite = !this.isShowNewCelebrite;
        },
        showUpdateCelebrite(celebrite){
            this.isShowModCelebrite = !this.isShowModCelebrite;
            this.celebrite = celebrite;
            this.searchQueryCelebrites = celebrite.nom;
            $("liste_celebrites").fadeOut();
        },
        createNewCelebrite(){
            CelebriteService.addCelebrite(this.celebrite);
        },
        updateCelebrite(){
            CelebriteService.editCelebrite(this.celebrite.numCelebrite, this.celebrite);
        },
        deleteCelebrite(){
            CelebriteService.deleteCelebrite(this.celebrite.numCelebrite);
        },

        //Pour upload les photos
        onPhotoUpload(){
            let file = this.$refs.uploadPhoto.files[0];
            this.formData = new FormData();
            this.formData.append("file",file);
        },
        startUpload(typeUpload){
            axios({
                url: "http://localhost:8080/api/upload",
                method: "POST",
                data: this.formData,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data'
                },

            }).then(response =>{
                if (typeUpload=="m"){
                    this.monument.photoUrl = response.data;
                }
                if (typeUpload=="c"){
                    this.celebrite.photoUrl = response.data;
                }
                
                
            })
        }
     
  }
  
};

</script>
<style scoped>
    .show-search-list {
        position: absolute;
        widows: auto;
        z-index: 999;
        width: 195px;
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

    .main-modification{
        margin-top: 20px;
    }
    #mapContainer{
    height: 200px;
    width: 400px;
}
</style>