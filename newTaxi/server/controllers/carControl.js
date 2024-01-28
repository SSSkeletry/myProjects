const vuid = require('uuid')
const path = require('path')
const {Car, CarInfo} = require('../models/models')
const ApiError = require('../error/apiError')

class CarController{
    async create(req,res,next){
        try{
        const {number_car, name_car, class_car} = req.body;
        const {img} = req.files;
        let fileName = vuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static',fileName));

        const car = await Car.create({number_car, name_car, class_car,img: fileName});

        return res.json(car)
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }
    async getOne(req,res){
        const {id} = req.params;
        const car = await Car.findOne(
            {
                where: {id},
                include: ['info']
            },
        )
        return res.json(car);
    }
}

module.exports = new CarController();