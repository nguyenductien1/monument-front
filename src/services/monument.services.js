import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class MonumentService {
  getAllMonuments() {
    return axios.get(API_URL + 'monuments', { headers: authHeader() });
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
    let monu_celeb={
      codeM: codeM,
      numCelebrite: numCelebrite,
    }
    return axios.post(API_URL + 'monuments/celebrites',
    monu_celeb, { headers: authHeader()})
    .then(response => {
      if (response.status === 202) {
          alert('Celebrite is added successfully to this Monument');
      }
      else {
          alert('Celebrite is not added to this Monument');
      }
  })
  }
  deleteCelebriteFromMonument(codeM, numCelebrite){
    
    return axios.delete(API_URL + 'monuments/celebrites/'+codeM+'/'+numCelebrite,
    { headers: authHeader()})
    .then(response => {
      if (response.status === 202) {
          alert('Celebrite is deleted successfully from this Monument');
      }
      else {
          alert('Celebrite is not deleted from this Monument');
      }
  })
  }
}

export default new MonumentService();