import axios from 'axios';

const client = axios.create({
  baseURL: '',          // petición relativa
  headers: { 'Content-Type': 'application/json' },
});

export default client;

