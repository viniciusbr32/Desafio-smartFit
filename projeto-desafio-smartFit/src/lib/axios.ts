import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://test-frontend-developer.s3.amazonaws.com/data/',
});
