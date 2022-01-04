import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class DepartementService {
  getAllDepartements() {
    return axios.get(API_URL + 'departements', { headers: authHeader() });
  }

  addDepartement(departement) {
    axios.post(API_URL + 'departements',{ 
        dep: departement.dep,
        nomDep: departement.nomDep,
        chefLieu: departement.chefLieu,
        reg: departement.reg
    }, { headers: authHeader() }).then(response => {
        if (response.status === 200) {
            alert('Departement is created successfully');
        }
        else {
            alert('Departement is not created');
        }
    });
  }

  getDetails(dep){
    return axios.get(API_URL + 'departements/'+dep, { headers: authHeader() });
  }
  getLieuxbyDepartement(dep){
    return axios.get(API_URL + 'departements/lieux/'+dep, { headers: authHeader() });
  }

  editDepartement(dep, codeInseeChefLieu) {
    axios.patch(API_URL + 'departements/'+dep,{
        codeInseeChefLieu: codeInseeChefLieu
    }, { headers: authHeader() }).then(response => {
        if (response.status === 200) {
            alert('Departement is updated successfully');
        }
        else {
            alert('Departement is not updated');
        }
    });
  }

  deleteDepartement(dep) {
    axios.delete(API_URL + 'departements/'+dep, { headers: authHeader() })
    .then(response => {
        if (response.status === 202) {
            alert('Departement is deleted successfully');
        }
        else {
            alert('Departement is not deleted');
        }
    });
  }
}

export default new DepartementService();