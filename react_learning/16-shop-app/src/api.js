import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1/projects/shop-app-c8539/databases/(default)/documents',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
