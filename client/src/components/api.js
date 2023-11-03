import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5015', // Set the base URL for your server
});

export default api;
