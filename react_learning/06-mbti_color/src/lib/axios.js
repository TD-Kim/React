import axios from "axios";

// npm install axios 해야함

const instance = axios.create({
  baseURL: "https://learn.codeit.kr/api/",
});

export default instance;
