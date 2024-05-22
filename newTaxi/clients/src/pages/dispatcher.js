import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/dispatcher.css';
import DispMap from '../script/dispatcherMap';
import { observer } from 'mobx-react-lite';
import { getData } from '../http/userApi';


const Dispatcher = observer(() => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL; // Используем переменную окружения
                const response = await axios.get(`${apiUrl}api/order/getall`);
                const orderData = response.data;
                if (Array.isArray(orderData)) {
                    setOrders(orderData.filter(order => order.status !== 'У виконанні'&& order.status !== 'Завершено'));
                } else {
                    console.error("Unexpected response format:", orderData);
                }
                // ----------
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
        fetchPhoneNumber();
    }, []);
    const fetchPhoneNumber = async () => {
        try {
            const data = await getData();
            if (data) {
                setPhone(data);
            } else {
                console.log("Dispatcher phone not found in data");
            }
        } catch (error) {
            console.error('Error fetching dispatcher phone number:', error);
        }
    };

    const acceptOrder = async (orderId) => {
        try {
            console.log("Attempting to accept order with ID:", orderId); // Логирование orderId
            console.log("Dispatcher phone before accepting order:", phone); // Логирование телефона диспетчера

            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.post(`${apiUrl}api/order/accept`, { orderId, dispatcherPhone: phone });
            alert("Order accepted successfully!");
            setOrders(orders.map(order => order.idOrder === orderId ? { ...order, status: 'У виконанні' } : order));
            navigate('/order'); // Перенаправление на страницу Order
        } catch (error) {
            console.error("Error accepting order:", error);
            alert("Failed to accept order.");
        }
    };
    return (
        <div className='body-work'>
        <div className="order-management">
        <div className="header-container">
                    <h1>Прийняти замовлення</h1>
                    <h2>Диспетчер</h2>
                </div>
            <div className="orders">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="order-card">
                             <DispMap startPlace={order.start_place} endPlace={order.end_place} />
                            <p>Номер телефона: {order.userPhone}</p>
                            <p>Місце відправки: {order.start_place}</p>
                            <p>Місце прибуття: {order.end_place}</p>
                            <p>Коментарі: {order.comment}</p>
                            <button onClick={() => acceptOrder(order.idOrder)}>Прийняти замовлення</button>
                        </div>
                    ))
                ) : (
                    <p>Ви ще не прийняли замовлення</p>
                )}
            </div>
        </div>
    </div>
    );
});

export default Dispatcher;
