
<template>
  <div class="container">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
    <div class="panel panel-default table-container">
    <div class="panel-heading">Monuments</div>
    <div class="panel-body">
      <div class="row">
          <div class="search-wrapper panel-heading col-sm-12">
              <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
        </div>                        
      </div>
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
            <tr v-for="(monument, index) in displayedMonuments" :key="monument.codeM">
              <td class="text-right">{{perPage * (page - 1) + index + 1}}</td>
              <td>
                <span class="picture">
                  <img v-if="monument.photoUrl" :src="monument.photoUrl" :alt="monument.nomM"  class="img-circle">
                  <img v-else src="../assets/img/no-photo.jpg" :alt="monument.nomM"  class="img-circle">
                </span>
                <span><router-link :to="'/monuments/' + monument.codeM">{{ monument.nomM }}</router-link></span>
              </td>
              <td> {{monument.typeMonument}} </td>
              <td>{{monument.proprietaire}}</td>
              <td v-if="monument.lieu">{{monument.lieu.nomCom}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <nav class="text-center" aria-label="Page navigation">
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
      <li v-for="pageNumber in pages.slice(page-1, page+4)" :key="pageNumber" :class="{'active': page === pageNumber}"><a href="#" @click="page = pageNumber">{{pageNumber}}</a></li>
      <li>
        <a href="#" @click="page++" v-if="page < pages.length" aria-label="Next">
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
  </div>
</template>

<script>
import MonumentService from "../services/monument.services";

export default {
  name: "Home",
  data() {
    return {
      searchQuery: null,
      monuments: "",
      page: 1,
      perPage: 10,
      pages: [],
      loading: true
    };
  },
  mounted() {
    MonumentService.getAllMonuments().then(
      (response) => {
        console.log(response.status);
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
  methods: {
    setPages() {
            var numberOfPages = Math.ceil(this.monuments.length / this.perPage);
            for (var index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
    paginate(monuments) {
        var page = this.page;
        var perPage = this.perPage;
        var from = (page * perPage) - perPage;
        var to = (page * perPage);
        return monuments.slice(from, to);
    }
  },
  watch: {
        monuments() {
            this.setPages();
        }
    },
  computed: {
        displayedMonuments() {
            if(this.searchQuery){
              return this.paginate(this.monuments.filter((monument)=>{
                return this.searchQuery.toLowerCase().split(' ').every(v => monument.nomM.toLowerCase().includes(v))
              }))
            }else{
              return this.paginate(this.monuments);
            }
        },
  }
    
};
</script>

<style scoped>
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
  .table-container table tr th:first-child, .table-container table tr td:first-child {
    border-left: none;
  }
  .table-container table tr th:last-child, .table-container table tr td:last-child {
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
</style>