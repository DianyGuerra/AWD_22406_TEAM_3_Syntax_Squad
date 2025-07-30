// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://awd-22406-team-3-syntax-squad.onrender.com', 
  headers: { 'Content-Type': 'application/json' },
});

export default client;
