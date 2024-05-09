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
    async getAll(req,res){
        
    }
    async getOne(req,res){
        
    }
}

module.exports = new OrderController();