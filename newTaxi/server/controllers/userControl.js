const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


const generateJwt = (id,email,phone,firstName,lastName,role) =>{
    return jwt.sign(
        {id, email, phone: phone,firstName,lastName,role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
        )
}

class UserContoller{
    async registration(req,res,next){
        const {email, phone, password,firstName,lastName,role} = req.body;
        if(!email || !password ){
            return next(ApiError.badRequest('Не допустима пошта або пароль'))
        }
        const userEmail = await User.findOne({where: {email} }) 
        if(userEmail){
            return next(ApiError.badRequest('Така пошта вже існує'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,password: hashPassword,firstName,lastName,phone,role})
        const token = generateJwt(user.id, user.email, user.phone,user.firstName,user.lastName, user.role)
            return res.json({token})

    }
    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
           return next(ApiError.badRequest('Користувача не знайдено'));
        }
        let comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass){
            return next(ApiError.badRequest('Введений пароль не правильний!'));
        }
        const token = generateJwt(user.id,user.email,user.phone,user.firstName,user.lastName,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.phone,req.user.firstName,req.user.lastName, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserContoller();