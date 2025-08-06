import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:3007';
const BASE_URL = `${API_ROOT.replace(/\/$/, '')}/blakbox`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // <-- para depurar
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default client;
