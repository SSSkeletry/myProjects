const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Driver, Dispatcher } = require('../models/models')

const generateJwt = (id, email, phone, firstName, lastName, role) => {
    return jwt.sign(
        { id, email, phone, firstName, lastName, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, phone, password, firstName, lastName, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Не допустима пошта або пароль'));
        }

        // Проверка email в таблице User
        const userEmail = await User.findOne({ where: { email } });
        if (userEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована'));
        }

        // Проверка email в таблице Driver
        const driverEmail = await Driver.findOne({ where: { email } });
        if (driverEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована в таблиці водіїв'));
        }

        // Проверка email в таблице Dispatcher
        const dispatcherEmail = await Dispatcher.findOne({ where: { email } });
        if (dispatcherEmail) {
            return next(ApiError.badRequest('Пошта вже зареєстрована в таблиці диспетчерів'));
        }

        // Проверка phone в таблице User
        const userPhone = await User.findOne({ where: { phone } });
        if (userPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований'));
        }

        // Проверка phone в таблице Driver
        const driverPhone = await Driver.findOne({ where: { phone } });
        if (driverPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований в таблиці водіїв'));
        }

        // Проверка phone в таблице Dispatcher
        const dispatcherPhone = await Dispatcher.findOne({ where: { phone } });
        if (dispatcherPhone) {
            return next(ApiError.badRequest('Телефон вже зареєстрований в таблиці диспетчерів'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, firstName, lastName, phone, role });
        const token = generateJwt(user.id, user.email, user.phone, user.firstName, user.lastName, user.role);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        let user;
        let role;

        // Проверка в таблице User
        user = await User.findOne({ where: { email } });
        if (user) {
            role = 'USER';
        }

        // Проверка в таблице Driver, если не найден в User
        if (!user) {
            user = await Driver.findOne({ where: { email } });
            if (user) {
                role = 'DRIVER';
            }
        }

        // Проверка в таблице Dispatcher, если не найден в User и Driver
        if (!user) {
            user = await Dispatcher.findOne({ where: { email } });
            if (user) {
                role = 'DISPATCHER';
            }
        }

        // Если пользователь не найден
        if (!user) {
            return next(ApiError.badRequest('Користувача не знайдено'));
        }

        // Проверка пароля
        let comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(ApiError.badRequest('Введений пароль не правильний!'));
        }

        // Генерация токена
        const token = generateJwt(user.id, user.email, user.phone, user.firstName, user.lastName, role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.phone, req.user.firstName, req.user.lastName, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
