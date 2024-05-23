import { $host } from ".";

export const createCar = async (number_car, name_car, class_car, img) => {
    const formData = new FormData();
    formData.append('number_car', number_car);
    formData.append('name_car', name_car);
    formData.append('class_car', class_car);
    formData.append('img', img);

    const { data } = await $host.post('api/car', formData);
    return data;
};

export const getCar = async (id) => {
    const { data } = await $host.get(`api/car/${id}`);
    return data;
};