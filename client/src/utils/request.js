import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default request;
