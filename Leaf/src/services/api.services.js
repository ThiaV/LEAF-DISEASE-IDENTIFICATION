import axios from "axios";
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export default () => {
  return axios.create({
    baseURL: "http://127.0.0.1:5000",
    ...commonConfig,
  });
};
