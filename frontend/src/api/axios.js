import axios from 'axios';

const API = axios.create({
  baseURL: 'https://refactored-doodle-64w9jw5wrwq244wr-5000.app.github.dev/api/v1/users',
  withCredentials: false
});

export default API;
