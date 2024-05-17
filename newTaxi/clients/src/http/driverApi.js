import { $host } from ".";
import {jwtDecode} from 'jwt-decode';

export const registration = async (email, phone, password, firstName, lastName, number_car, name_car, class_car, img) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('number_car', number_car);
    formData.append('name_car', name_car);
    formData.append('class_car', class_car);
    formData.append('img', img);
    console.log('Form Data Entries:', Array.from(formData.entries()));
    const { data } = await $host.post('api/driver/registration', formData);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
