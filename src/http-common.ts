import axios from "axios";

export default axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  headers: {
    "Accept":"application/json, text/plain, /",
    "Content-Type": "multipart/form-data"
  },
  params: {"code": process.env.REACT_APP_API_CODE}
});