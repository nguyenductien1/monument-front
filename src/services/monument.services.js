import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class MonumentService {
  getAllMonuments() {
    return axios.get(API_URL + 'monuments');
  }

  addMonument(monument) {
    return axios.post(API_URL + 'monuments',{
        codeM: monument.codeM,
        nomM: monument.nomM,
        proprietaire: monument.proprietaire,
        typeMonument: monument.typeMonument, 
        longitude: monument.longitude,
        latitude: monument.latitude,
        codeLieu: monument.lieu.codeInsee,
        photoUrl: monument.photoUrl
    }, { headers: authHeader() }).then(response => {
      if (response.status === 201) {
          alert('Monument is created successfully');
      }
      else {
          alert('Monument is not created');
      }
  });
  }

  getDetails(codeM){
    return axios.get(API_URL + 'monuments/'+codeM, { headers: authHeader() });
  }

  editMonument(codeM, monument) {
    return axios.patch(API_URL + 'monuments/'+codeM, {
        nomM: monument.nomM,
        proprietaire: monument.proprietaire,
        typeMonument: monument.typeMonument, 
        longitude: monument.longitude,
        latitude: monument.latitude,
        codeLieu: monument.lieu.codeInsee, 
        photoUrl: monument.photoUrl
    }, { headers: authHeader() }).then(response => {
      if (response.status === 202) {
          alert('Monument is updated successfully');
      }
      else {
          alert('Monument is not updated');
      }
  });
  }

  deleteMonument(monument) {
    return axios.delete(API_URL + 'monuments/'+monument.codeM, { headers: authHeader() })
    .then(response => {
      if (response.status === 202) {
          alert('Monument is deleted successfully');
      }
      else {
          alert('Monument is not deleted');
      }
  });
  }

  addCelebriteToMonument(codeM, numCelebrite){
    return axios.post(API_URL + 'monuments/celebrites',
    {
      codeM: codeM,
      numCelebrite: numCelebrite
    }, { headers: authHeader()})
  }
}

export default new MonumentService();