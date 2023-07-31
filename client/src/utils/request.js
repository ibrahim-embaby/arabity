import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000", //"https://arabity.onrender.com",
});

export default request;
