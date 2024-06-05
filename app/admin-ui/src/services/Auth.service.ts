import axios from "axios";
import { useState } from "react";

// axios.defaults.auth = {
//     username: 'admin',
//     password: 'admin'
// }

export function useToken() {

    const getToken = () => {
        let t = localStorage.getItem('token');
        if (t === 'undefined') {
            t = null
        }
        return t
    };


    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: string) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        clearToken
    }
}

export function login(username: string, password: string) {
    return axios.post('/auth/login', { username, password })
}

export async function isAuthenticated() {
    try {
        await axios.get('/api/me', { withCredentials: true });
        return true
    } catch (error) {
        return false
    }
}