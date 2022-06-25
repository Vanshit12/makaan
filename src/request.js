import axios from 'axios';

const interceptorConfig = config => {
	const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.common["Authorization"] = 'Bearer ' + token;
  }
  return config;
}
const interceptorErrorHandler = error => {
  return Promise.reject(error);
}
export const Makaan = axios.create({
    baseURL: ' http://localhost:3001/',
    headers: {'Content-Type': 'application/json'}
})
  
Makaan.interceptors.request.use(interceptorConfig,interceptorErrorHandler);

 