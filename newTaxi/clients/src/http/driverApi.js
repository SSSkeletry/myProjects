import { $host } from ".";
import {jwtDecode} from 'jwt-decode';

export const registration = async (email, phone, password, firstName, lastName) => {
    const { data } = await $host.post('api/driver/registration', { email, phone, password, firstName, lastName, role: 'DRIVER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
