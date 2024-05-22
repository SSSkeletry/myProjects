import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { getData } from '../http/userApi';
import DriverMap from '../script/driverMap';
import '../style/driver.css';
import taxiInstance from '../main/singletonTaxi';

const Driver = observer(() => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchDriverPhone = async () => {
            try {
                const data = await getData();
                if (data) {
                    setPhone(data);
                    taxiInstance.setDriver(data);
                } else {
                    console.log("Driver phone not found in data");
                }
            } catch (error) {
                console.error('Error fetching driver phone number:', error);
            }
        };
        fetchDriverPhone();
    }, []);

    useEffect(() => {
        if (phone) {
            const fetchDriverOrders = async () => {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await axios.get(`${apiUrl}api/order/driverOrders`, {
                        params: { phone }
                    });
                    const orderData = response.data;
                    setOrders(orderData);
                } catch (error) {
                    console.error("Error fetching driver orders:", error);
                }
            };

            fetchDriverOrders();
        }
    }, [phone]);

    useEffect(() => {
        const storedIsAvailable = JSON.parse(localStorage.getItem('isAvailable'));
        if (storedIsAvailable !== null) {
            taxiInstance.setIsAvailable(storedIsAvailable);
        }
    }, []);

    const toggleAvailability = async () => {
        const newAvailability = !taxiInstance.isAvailable;
        taxiInstance.setIsAvailable(newAvailability);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}api/driver/updateAvailability`, {
                phone,
                isAvailable: newAvailability
            });
            console.log('Availability updated:', response.data);
        } catch (error) {
            console.error('Error updating availability:', error.response ? error.response.data : error.message);
        }
    };

    const completeOrder = async (orderId) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}api/order/completeOrder`, { orderId });
            const updatedOrder = response.data;
            setOrders(prevOrders => prevOrders.filter(order => order.idOrder !== orderId));
            alert('Замовлення завершено успішно');
        } catch (error) {
            console.error('Error completing order:', error.response ? error.response.data : error.message);
            alert('Не вдалося завершити замовлення');
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className='body-work'>
            <div className="order-management">
                <header className="header-container">
                    <h1>Мої замовлення</h1>
                    <h2>Водій</h2>
                </header>
                <button onClick={toggleAvailability}>
                    {taxiInstance.isAvailable ? 'Закінчити роботу' : 'Працювати'}
                </button>
                <div className="orders">
                    {orders.length > 0 ? (
                        orders.filter(order => !order.end_time).map(order => (
                            <div key={order.idOrder} className="order-card">
                                <DriverMap startPlace={order.start_place} endPlace={order.end_place} />
                                <p>Номер телефона: {order.userPhone}</p>
                                <p>Місце відправки: {order.start_place}</p>
                                <p>Місце прибуття: {order.end_place}</p>
                                <p>Початок замовлення: {formatDateTime(order.start_time)}</p> {/* Отображение форматированной даты */}
                                <p>Коментарі: {order.comment}</p>
                                <p>Ціна: {order.price ? `${order.price} грн` : 'Не встановлено'}</p> {/* Отображение цены */}
                                <button onClick={() => completeOrder(order.idOrder)}>
                                    Завершити замовлення
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Замовлень немає, зачекайте будь ласка</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Driver;
