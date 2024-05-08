import { $authHost,$host } from ".";
import {jwtDecode} from 'jwt-decode';

export const registration = async (email, phone, password,firstName,lastName) => {
    const {data} = await $host.post('api/user/registration',{email, phone, password,firstName,lastName,role:'USER'})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login',{email, password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token);
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token);
}

export const getData = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const phoneNumber = decodedToken.phone;
    return phoneNumber;
}
export const create = async (userPhone, start_place, end_place, comment) => {
    const body = { start_place, end_place, comment };
    if (userPhone) {
        body.userPhone = userPhone;
    }
    const { data } = await $host.post('api/order/create', body);
    return data;
};