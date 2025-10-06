import axios from "axios";

const instanceAxios = axios.create({
    baseURL: "http://localhost:3000", // URL de votre API
    //withCredentials: true, // Inclut les cookies
  });
  
  export default instanceAxios;