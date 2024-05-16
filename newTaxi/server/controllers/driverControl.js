const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Driver, Dispatcher } = require('../models/models');

const generateJwt = (id, email, phone, firstName, lastName, role) => {
    return jwt.sign(
        { id, email, phone, firstName, lastName, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class DriverController {
    async registration(req, res, next) {
        const { email, phone, password, firstName, lastName, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Не допустима пошта або пароль'));
        }

        // Проверка email в таблице Driver
        const driverEmail = await Driver.findOne({ where: { email } });
        if (driverEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована'));
        }

        // Проверка email в таблице User
        const userEmail = await User.findOne({ where: { email } });
        if (userEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована в таблиці користувачів'));
        }

        // Проверка email в таблице Dispatcher
        const dispatcherEmail = await Dispatcher.findOne({ where: { email } });
        if (dispatcherEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована в таблиці диспетчерів'));
        }

        // Проверка phone в таблице Driver
        const driverPhone = await Driver.findOne({ where: { phone } });
        if (driverPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований'));
        }

        // Проверка phone в таблице User
        const userPhone = await User.findOne({ where: { phone } });
        if (userPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований в таблиці користувачів'));
        }

        // Проверка phone в таблице Dispatcher
        const dispatcherPhone = await Dispatcher.findOne({ where: { phone } });
        if (dispatcherPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований в таблиці диспетчерів'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const driver = await Driver.create({ email, password: hashPassword, firstName, lastName, phone, role });
        const token = generateJwt(driver.id, driver.email, driver.phone, driver.firstName, driver.lastName, driver.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.driver.id, req.driver.email, req.driver.phone, req.driver.firstName, req.driver.lastName, req.driver.role);
        return res.json({ token });
    }
}

module.exports = new DriverController();
