import { useState } from "react";

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