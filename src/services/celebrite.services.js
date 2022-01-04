import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class CelebriteService {
  getAllCelebrites() {
    return axios.get(API_URL + 'celebrites', { headers: authHeader() });
  }

  addCelebrite(celebrite) {
    return axios.post(API_URL + 'celebrites',{
      nom: celebrite.nom,
      prenom: celebrite.prenom,
      nationalite: celebrite.nationalite,
      epoque: celebrite.epoque, 
      photoUrl: celebrite.photoUrl
    }, { headers: authHeader() }).then(response => {
      if (response.status === 201) {
          alert('Celebrite is created successfully');
      }
      else {
          alert('Celebrite is not created');
      }
  });
  }

  getDetails(id){
    return axios.get(API_URL + 'celebrites/'+id, { headers: authHeader() });
  }
  getMonuments(id){
    return axios.get(API_URL + 'celebrites/monuments/'+id, { headers: authHeader() });
  }

  editCelebrite(id, celebrite) {
    return axios.patch(API_URL + 'celebrites/'+id, {
      nom: celebrite.nom,
      prenom: celebrite.prenom,
      nationalite: celebrite.nationalite,
      epoque: celebrite.epoque, 
      photoUrl: celebrite.photoUrl
    },{ headers: authHeader() }).then(response => {
      if (response.status === 202) {
          alert('Celebrite is modified successfully');
      }
      else {
          alert('Celebrite is not modified');
      }
  });
  }

  deleteCelebrite(id) {
    return axios.delete(API_URL + 'celebrites/'+id, { headers: authHeader() })
    .then(response => {
      if (response.status === 202) {
          alert('Celebrite is deleted successfully');
      }
      else {
          alert('Celebrite is not deleted');
      }
  });
  }
}

export default new CelebriteService();