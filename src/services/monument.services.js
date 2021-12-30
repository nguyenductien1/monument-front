import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class MonumentService {
  getAllMonuments() {
    return axios.get(API_URL + 'monuments');
  }

  addMonument() {
    return axios.post(API_URL + 'monuments', { headers: authHeader() });
  }

  getDetails(codeM){
    return axios.get(API_URL + 'monuments/'+codeM, { headers: authHeader() });
  }

  editMonument(codeM) {
    return axios.patch(API_URL + 'monuments/'+codeM, { headers: authHeader() });
  }

  deleteMonument(codeM) {
    return axios.delete(API_URL + 'monuments/'+codeM, { headers: authHeader() });
  }
}

export default new MonumentService();