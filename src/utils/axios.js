import axios from "axios";

const instanceAxios = axios.create({
     baseURL: import.meta.env.VITE_API_URL, // URL de votre API
    //withCredentials: true, // Inclut les cookies
  });
  


  export default instanceAxios;