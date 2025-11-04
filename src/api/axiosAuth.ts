import axios, { type AxiosInstance } from "axios";

const axiosAuth: AxiosInstance = axios.create({
  baseURL: "https://localhost:7000/iam", // ✅ Gateway IAM route
  headers: { "Content-Type": "application/json" },
});

export default axiosAuth;
