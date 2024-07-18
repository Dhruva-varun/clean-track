import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // update the base URL if different
});

export default api;
