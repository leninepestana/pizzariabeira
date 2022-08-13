import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.66:3333",
  // baseURL: "http://10.203.4.233:3333",
});

export { api };
