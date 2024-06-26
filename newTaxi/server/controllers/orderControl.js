const {Order,User,Driver, sequelize } = require('../models/models')
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
            return res.status(500).json({ message: 'Не вдалося отримати замовлення' });
        }
    }

    async getDispatcherOrders(req, res) {
        try {
            const { phone } = req.query;
            const orders = await Order.findAll({ where: { dispatcherPhone: phone,status: 'У виконанні' } });
            return res.json(orders);
        } catch (e) {
            return res.status(500).json({ message: 'Не вдалося отримати замовлення диспетчера' });
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
                return res.status(404).json({ message: 'Замовлення не знайдено' });
            }
            order.status = 'У виконанні';
            order.dispatcherPhone = dispatcherPhone;
            order.start_time = currentTime;
            await order.save();
            console.log("Order accepted:", order); // Логирование принятого заказа
            return res.json({ message: 'Замовлення прийнято' });
        } catch (e) {
            console.error("Error in accept controller:", e); // Логирование ошибки
            return res.status(500).json({ message: 'Помилка прийняття замовлення' });
        }
    }
    async assignDriver(req, res) {
        try {
            const { orderId, driverPhone,price } = req.body;
            console.log("Assigning driver:", driverPhone, "to order:", orderId); // Логирование назначения водителя
            if (price === undefined) {
                return next(ApiError.badRequest('Ціна не вказана'));
            }
            const order = await Order.findByPk(orderId);
            if (!order) {
                console.log("Order not found for ID:", orderId);
                return res.status(404).json({ message: 'Замовлення не знайдено' });
            }
            order.driverPhone = driverPhone; // Назначение водителя заказу
            order.price = price;
            await order.save();
            console.log("Driver assigned:", order);
            return res.json({ message: 'Водія був призначений', order });
        } catch (e) {
            console.error("Error in assignDriver controller:", e);
            return res.status(500).json({ message: 'Не вдалося призначити водія' });
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
            return res.status(500).json({ message: 'Не вдалося отримати замовлення водія' });
        }
    }
    async completeOrder(req, res, next) {
        const { orderId } = req.body;
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return next(ApiError.badRequest('Замовлення не знайдено'));
            }

            const driver = await Driver.findOne({ where: { phone: order.driverPhone } });
            if (!driver) {
                return next(ApiError.badRequest('Водія не знайдено'));
            }
            
            order.end_time = new Date(); // Установить текущее время
            await order.save();

            return res.json(order);
        } catch (error) {
            console.error('Error completing order:', error);
            return next(ApiError.internal('Помилка прийняття замовлення'));
        }
    }
    async completeOrderWithRating(req, res, next) {
        const { orderId, tripRate } = req.body;
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return next(ApiError.badRequest('Замовлення не знайдено'));
            }

            const driver = await Driver.findOne({ where: { phone: order.driverPhone } });
            if (!driver) {
                return next(ApiError.badRequest('Водія не знайдено'));
            }

            // Завершение заказа
            order.end_time = new Date();
            order.trip_rate = tripRate;
            await order.save();

            // Обновление рейтинга водителя
            const currentRating = parseFloat(driver.rating || 0);
            const numberOfRatings = parseInt(driver.numberOfTrips || 0);
            const newRating = (currentRating * numberOfRatings + parseFloat(tripRate)) / (numberOfRatings + 1);

            driver.numberOfTrips = numberOfRatings + 1;
            driver.rating = newRating.toFixed(2); 
            await driver.save();
            if (order) {
                await order.update({
                  status: 'Завершено'
                });
            
                console.log('Order status updated to Завершено.');
              } else {
                console.log('Order not found.');
              }
            return res.json(order);
        } catch (error) {
            console.error('Error completing order with rating:', error);
            return next(ApiError.internal('Не вдалося виконати замовлення з оцінкою'));
        }
    }
}
module.exports = new OrderController();