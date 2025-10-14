import axios from "axios";

const instanceAxios = axios.create({
     baseURL: import.meta.env.VITE_API_URL, // URL de votre API
    //withCredentials: true, // Inclut les cookies
  });
  
  console.log("URL du backend :", import.meta.env.VITE_API_URL);

  export default instanceAxios;