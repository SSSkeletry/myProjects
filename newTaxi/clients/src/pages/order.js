import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../style/dispatcher.css';
import OrderMap from '../script/orderMap';
import { getData } from '../http/userApi';

const Order = () => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDrivers, setSelectedDrivers] = useState({});
    const [assignedOrders, setAssignedOrders] = useState({});
    const [distances, setDistances] = useState({});

    const BASE_RATE = 50; // Базовая ставка в гривнах
    const PRICE_PER_KM = 10; // Цена за километр в гривнах

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
        const fetchOrders = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}api/order/dispatcherOrders`, {
                    params: { phone }
                });
                const orderData = response.data;
                setOrders(orderData);

                // Восстановление состояния назначенных водителей
                const assignedDrivers = {};
                const assignedOrdersState = {};
                orderData.forEach(order => {
                    if (order.driverPhone) {
                        const driver = drivers.find(driver => driver.phone === order.driverPhone);
                        if (driver) {
                            assignedDrivers[order.idOrder] = { value: driver.phone, label: `${driver.firstName} ${driver.lastName}` };
                            assignedOrdersState[order.idOrder] = true;
                        }
                    }
                });
                setSelectedDrivers(assignedDrivers);
                setAssignedOrders(assignedOrdersState);
            } catch (error) {
                console.error("Error fetching dispatcher orders:", error);
            }
        };

        if (phone) {
            fetchOrders();
        }
    }, [phone, drivers]);

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

    const handleDistanceCalculated = (orderId, distance) => {
        setDistances(prevDistances => ({
            ...prevDistances,
            [orderId]: distance
        }));
    };

    const calculatePrice = (distanceInKm) => {
        return BASE_RATE + (PRICE_PER_KM * distanceInKm);
    };

    const assignDriver = async (orderId) => {
        try {
            const selectedDriver = selectedDrivers[orderId];
            if (!selectedDriver) {
                alert("Please select a driver first.");
                return;
            }

            const distanceInKm = distances[orderId];
            if (!distanceInKm) {
                alert("Distance not calculated yet.");
                return;
            }

            const price = calculatePrice(distanceInKm);

            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.post(`${apiUrl}api/order/assignDriver`, { orderId, driverPhone: selectedDriver.value, price });
            setAssignedOrders(prevAssignedOrders => ({
                ...prevAssignedOrders,
                [orderId]: true
            }));
            alert(`Driver assigned successfully! Distance: ${distanceInKm} km, Price: ${price} грн`);
        } catch (error) {
            console.error("Error assigning driver:", error);
            alert("Failed to assign driver.");
        }
    };

    const driverOptions = drivers
        .filter(driver => driver.isAvailable)
        .map(driver => ({
            value: driver.phone,
            label: `${driver.firstName} ${driver.lastName}`
        }));

    return (
        <div className='body-disp'>
            <div className="order-management">
                <header>
                    <h1>Мої прийняті замовлення</h1>
                    <h2>Диспетчер</h2>
                </header>
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
                                <p>Відстань: {distances[order.idOrder] ? `${distances[order.idOrder]} км` : 'Не встановлено'}</p>
                                <p>Ціна: {order.price ? `${order.price} грн` : distances[order.idOrder] ? `${calculatePrice(distances[order.idOrder])} грн` : 'Не встановлено'}</p> {/* Отображение цены */}
                                <Select
                                    value={selectedDrivers[order.idOrder] || null}
                                    onChange={selectedOption => handleDriverChange(selectedOption, order.idOrder)}
                                    options={driverOptions}
                                    placeholder="Виберіть водія"
                                    className="custom-select"
                                    classNamePrefix="custom-select"
                                    isDisabled={assignedOrders[order.idOrder]} // Блокировка select
                                />
                                <OrderMap
                                    startPlace={order.start_place}
                                    endPlace={order.end_place}
                                    onDistanceCalculated={(distance) => handleDistanceCalculated(order.idOrder, distance)}
                                />
                                <button onClick={() => assignDriver(order.idOrder)} disabled={assignedOrders[order.idOrder]}>
                                    Assign Driver
                                </button>
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

