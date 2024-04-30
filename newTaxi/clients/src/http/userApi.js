import { $authHost,$host } from ".";
import {jwtDecode} from 'jwt-decode';

export const registration = async (email, phone, password,firstName,lastName) => {
    const {data} = await $host.post('api/user/registration',{email, phone, password,firstName,lastName,role:'USER'})
    return jwtDecode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login',{email, password})
    return jwtDecode(data.token);
}
export const check = async () => {
    const response = await $host.post('api/auth/registration')
    return response;
}