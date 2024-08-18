import axios from "axios";

// if (!process.env.API_ROUTE) {
//   throw new Error("Unavailable API ROUTE");
// }

const axiosInstance = axios.create({
  baseURL: process.env.API_ROUTE,
  timeout: 3000,
});

export default axiosInstance;
