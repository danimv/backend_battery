import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5032'//process.env.REACT_APP_API_URL, // Set the base URL for your server
});

export default api;
