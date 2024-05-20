import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../style/dispatcher.css';
import OrderMap from '../script/orderMap';
import { getData } from '../http/userApi';

const Order = () => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const data = await getData();
                if (data) {
                    setPhone(data); // Установка телефона непосредственно из data
                    console.log("Fetched dispatcher phone:", data); // Логирование телефона диспетчера
                } else {
                    console.log("Dispatcher phone not found in data");
                }
            } catch (error) {
                console.error('Error fetching dispatcher phone number:', error);
            }
        };

        fetchPhoneNumber();
    }, []); // Запускается один раз при монтировании компонента

    useEffect(() => {
        if (phone) {
            const fetchOrders = async () => {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    console.log("Fetching dispatcher orders for phone:", phone); // Логирование телефона диспетчера
                    const response = await axios.get(`${apiUrl}api/order/dispatcherOrders`, {
                        params: { phone: phone }
                    });
                    const orderData = response.data;
                    console.log("Fetched dispatcher orders:", orderData);
                    setOrders(orderData);
                } catch (error) {
                    console.error("Error fetching dispatcher orders:", error);
                }
            };

            fetchOrders();
        }
    }, [phone]); // Запускается каждый раз, когда изменяется phone

    return (
        <div className="order-page">
            <h1>Accepted Orders</h1>
            <div className="orders">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.idOrder} className="order-card">
                            <h3>Order {order.idOrder}</h3>
                            <p>User Phone: {order.userPhone}</p>
                            <p>Start Place: {order.start_place}</p>
                            <p>End Place: {order.end_place}</p>
                            <p>Start Time: {order.start_time}</p>
                            <p>Comment: {order.comment}</p>
                            <OrderMap startPlace={order.start_place} endPlace={order.end_place} />
                        </div>
                    ))
                ) : (
                    <p>No orders accepted yet.</p>
                )}
            </div>
        </div>
    );
};
export default Order