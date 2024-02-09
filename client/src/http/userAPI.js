import { $host } from '.';
import { jwtDecode } from 'jwt-decode';

export const signUp = async (login, password) => {
    const { data } = await $host.post('signup', { login, password });
    if (data.hasOwnProperty('message')) {
        return data.message;
    }
    localStorage.setItem('tokenInterlink', data.token);
    return jwtDecode(data.token);
}

export const logIn = async (login, password) => {
    const { data } = await $host.post('login', { login, password });
    if (data.hasOwnProperty('message')) {
        return data.message;
    }
    localStorage.setItem('tokenInterlink', data.token);
    return jwtDecode(data.token);
}