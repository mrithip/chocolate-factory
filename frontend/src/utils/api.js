import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('chocolateUser')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('chocolateUser')).token}`;
  }
  return req;
});

export default API;
