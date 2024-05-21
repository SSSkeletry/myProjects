const {Order,User, sequelize } = require('../models/models')
const bcrypt = require('bcrypt');

class OrderController{
    async create(req, res) {
        const { userPhone, start_place, end_place, comment } = req.body;
        const phoneAsString = userPhone.toString();

        try {
            // Проверяем, существует ли пользователь с таким телефоном
            let user = await User.findOne({ where: { phone: phoneAsString } });

            if (!user) {
                console.log("User not found, creating new one.");
                const fakeEmail = `${userPhone}@default.com`;
                const fakePassword = 'defaultPassword';
                const hashPassword = await bcrypt.hash(fakePassword, 5);

                user = await User.create({
                    email: fakeEmail,
                    phone: userPhone,
                    password: hashPassword,
                    firstName: 'Default',
                    lastName: 'User',
                    role: 'USER',
                    isTemporary: true
                });
            }

            const newOrder = await Order.create({
                userPhone,
                start_place,
                end_place,
                comment
            });

            console.log("Order created successfully");
            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            return res.json(orders);
        } catch (e) {
            return res.status(500).json({ message: 'Failed to fetch orders' });
        }
    }

    async getDispatcherOrders(req, res) {
        try {
            const { phone } = req.query;
            const orders = await Order.findAll({ where: { dispatcherPhone: phone,status: 'У виконанні' } });
            return res.json(orders);
        } catch (e) {
            return res.status(500).json({ message: 'Failed to fetch dispatcher orders' });
        }
    }
    async accept(req, res) {
        try {
            const { orderId,dispatcherPhone  } = req.body;
            const currentTime = new Date();
            console.log("Received orderId:", orderId); // Логирование orderId
            const order = await Order.findByPk(orderId);
            if (!order) {
                console.log("Order not found for ID:", orderId); // Логирование случая, когда заказ не найден
                return res.status(404).json({ message: 'Order not found' });
            }
            order.status = 'У виконанні';
            order.dispatcherPhone = dispatcherPhone;
            order.start_time = currentTime;
            await order.save();
            console.log("Order accepted:", order); // Логирование принятого заказа
            return res.json({ message: 'Order accepted successfully' });
        } catch (e) {
            console.error("Error in accept controller:", e); // Логирование ошибки
            return res.status(500).json({ message: 'Failed to accept order' });
        }
    }
    async assignDriver(req, res) {
        try {
            const { orderId, driverPhone } = req.body;
            console.log("Assigning driver:", driverPhone, "to order:", orderId); // Логирование назначения водителя
    
            const order = await Order.findByPk(orderId);
            if (!order) {
                console.log("Order not found for ID:", orderId);
                return res.status(404).json({ message: 'Order not found' });
            }
            order.driverPhone = driverPhone; // Назначение водителя заказу
            await order.save();
            console.log("Driver assigned:", order);
            return res.json({ message: 'Driver assigned successfully', order });
        } catch (e) {
            console.error("Error in assignDriver controller:", e);
            return res.status(500).json({ message: 'Failed to assign driver' });
        }
    }
    async getDriverOrders(req, res) {
        const { phone } = req.query;
        try {
            console.log(`Fetching orders for driver with phone: ${phone}`);
            const orders = await Order.findAll({ where: { driverPhone: phone } });
            console.log(`Found orders: ${orders.length}`);
            return res.json(orders);
        } catch (e) {
            console.error("Error fetching driver orders:", e);
            return res.status(500).json({ message: 'Failed to fetch driver orders' });
        }
    }
}
module.exports = new OrderController();