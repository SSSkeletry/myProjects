const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


const generateJwt = (id,email,phone,role) =>{
    return jwt.sign(
        {id, email, phone: phone,role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
        )
}

class UserContoller{
    async registration(req,res,next){
        const {email,password,phone,role} = req.body;
        if(!email || !password ){
            return next(ApiError.badRequest('incorrect email or password'))
        }
        const userEmail = await User.findOne({where: {email} }) 
        if(userEmail){
            return next(ApiError.badRequest('user with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,password: hashPassword,phone,role})
        const token = generateJwt(user.id, user,email, user.phone, user.role)
            return res.json({token})

    }
    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('User not found'))
        }
        let comparePass = bcrypt.compareSync(password,user.password)
        if(!comparePass){
            return next(ApiError.internal('Password incorrect'))
        }
        const token = generateJwt(user.id,user.email,user.phone,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.phone, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserContoller();