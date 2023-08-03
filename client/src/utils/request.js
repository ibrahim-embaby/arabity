import axios from "axios";
import { production } from "./constants";

const request = axios.create({
  baseURL: production
    ? "https://arabity.onrender.com"
    : "http://localhost:8000",
});

export default request;
