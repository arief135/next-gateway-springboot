import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/auth"

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);
export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { usernameOrEmail, password});
