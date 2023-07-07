import axios from "axios";

const request = axios.create({
  baseURL: "https://arabity.onrender.com", //"http://localhost:8000",
});

export default request;
