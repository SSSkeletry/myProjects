import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../style/dispatcher.css'; // Убедитесь, что путь правильный
import OrderMap from '../script/orderMap';
import { getData } from '../http/userApi';

const Order = () => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDrivers, setSelectedDrivers] = useState({});

    useEffect(() => {
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

        fetchPhoneNumber();
    }, []);

    useEffect(() => {
        if (phone) {
            const fetchOrders = async () => {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await axios.get(`${apiUrl}api/order/dispatcherOrders`, {
                        params: { phone: phone }
                    });
                    const orderData = response.data;
                    setOrders(orderData);
                } catch (error) {
                    console.error("Error fetching dispatcher orders:", error);
                }
            };

            fetchOrders();
        }
    }, [phone]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}api/driver/getall`);
                const driverData = response.data;
                setDrivers(driverData);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        fetchDrivers();
    }, []);

    const handleDriverChange = (selectedOption, orderId) => {
        setSelectedDrivers(prevSelectedDrivers => ({
            ...prevSelectedDrivers,
            [orderId]: selectedOption
        }));
    };

    const assignDriver = async (orderId) => {
        try {
            const selectedDriver = selectedDrivers[orderId];
            if (!selectedDriver) {
                alert("Please select a driver first.");
                return;
            }

            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.post(`${apiUrl}api/order/assignDriver`, { orderId, driverPhone: selectedDriver.value });
            alert("Driver assigned successfully!");
            // Обновление состояния заказов после назначения водителя
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.idOrder === orderId ? { ...order, driverPhone: selectedDriver.value } : order
                )
            );
        } catch (error) {
            console.error("Error assigning driver:", error);
            alert("Failed to assign driver.");
        }
    };

    const driverOptions = drivers.map(driver => ({
        value: driver.phone,
        label: `${driver.firstName} ${driver.lastName}`
    }));

    return (
        <div className='body-disp'>
            <div className="order-management">
                <div className="header-container">
                    <h1>Мої прийняті замовлення</h1>
                    <h2>Диспетчер</h2>
                </div>
                <div className="orders">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.idOrder} className="order-card">
                                <h3>Замовлення № {order.idOrder}</h3>
                                <p>Номер телефона: {order.userPhone}</p>
                                <p>Місце відправки: {order.start_place}</p>
                                <p>Місце прибуття: {order.end_place}</p>
                                <p>Початок замовлення: {order.start_time}</p>
                                <p>Коментарі: {order.comment}</p>
                                <Select
                                    value={selectedDrivers[order.idOrder] || null}
                                    onChange={selectedOption => handleDriverChange(selectedOption, order.idOrder)}
                                    options={driverOptions}
                                    placeholder="Виберіть водія"
                                    className="custom-select"
                                    classNamePrefix="custom-select"
                                />
                                <OrderMap startPlace={order.start_place} endPlace={order.end_place} />
                                <button onClick={() => assignDriver(order.idOrder)}>Assign Driver</button>
                            </div>
                        ))
                    ) : (
                        <p>No orders accepted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;
