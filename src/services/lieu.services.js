import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class LieuService {
  getAllLieux() {
    return axios.get(API_URL + 'lieux', { headers: authHeader() });
  }

  addLieu(lieu) {
    return axios.post(API_URL + 'lieux', {
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

  getDetails(codeInsee){
    return axios.get(API_URL + 'lieux/'+codeInsee, { headers: authHeader() });
  }
  getMonumentsbyLieu(codeInsee){
    return axios.get(API_URL + 'lieux/monuments/'+codeInsee, { headers: authHeader() });
  }

  editLieu(codeInsee, lieu) {
    return axios.patch(API_URL + 'lieux/'+codeInsee,{
      nomCom: lieu.nomCom,
      latitude: lieu.latitude,
      longitude: lieu.longitude,
      dep: lieu.dep
    }, { headers: authHeader() }).then(response => {
      if (response.status === 200) {
          alert('Lieu is updated successfully');
      }
      else {
          alert('Lieu is not updated');
      }
  });
  }

  deleteLieu(codeInsee) {
    return axios.delete(API_URL + 'lieux/'+codeInsee, { headers: authHeader() }).then(response => {
      if (response.status === 202) {
          alert('Lieu is deleted successfully');
      }
      else {
          alert('Lieu is not deleted');
      }
  });
  }
}

export default new LieuService();