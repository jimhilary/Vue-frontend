// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: ' http://127.0.0.1:8000', // Adjust the base URL as needed
});

export default instance;