import axios from 'axios';

const customFetch = axios.create({
  // baseURL: 'https://jobs-api-dyvv.onrender.com/api/v1',
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
});

export default customFetch;
