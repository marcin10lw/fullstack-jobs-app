import axios from "axios";

const customFetch = axios.create({
  // baseURL: "https://jobs-api-dyvv.onrender.com/api/v1",
  baseURL: "https://jobs-app-api-production.up.railway.app/api/v1",
  // baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export default customFetch;
