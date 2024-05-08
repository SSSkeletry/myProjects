const {Order} = require('../models/models')

class OrderController{
    async create(req, res){
        const { userPhone, start_place, end_place, comment } = req.body;
        try {
            const newOrder = await Order.create({
                userPhone,
                start_place,
                end_place,
                comment
            });
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAll(req,res){
        
    }
    async getOne(req,res){
        
    }
}

module.exports = new OrderController();