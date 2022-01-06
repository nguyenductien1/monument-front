import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class PhotoService {
  getPhoto() {
    return axios.get(API_URL + 'photo', { headers: authHeader() });
  }

  addLieu(lieu) {
    return axios.post(API_URL + 'upload', {
      codeInsee: lieu.codeInsee,
      nomCom: lieu.nomCom,
      latitude: lieu.latitude,
      longitude: lieu.longitude,
      dep: lieu.dep
    },{ headers: authHeader() }).then(response => {
      if (response.status === 200) {
          alert('Departement is created successfully');
      }
      else {
          alert('Departement is not created');
      }
  });
  }

  
}

export default new LieuService();