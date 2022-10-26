import axios from "axios";

export default axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  headers: {
    "Accept":"application/json, text/plain, /",
    "Content-Type": "multipart/form-data"
  },
  params: {"code": "oGi9K5wyWiF58BWs3SEh-wZ4KRt7lSXDj3o_CEo6-Zc0AzFuMlLTDg=="}
});