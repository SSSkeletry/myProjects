const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING,unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.CHAR,unique: true},
    role: {type: DataTypes.STRING,defaultValue: 'USER'}
})

const Car = sequelize.define('car',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_car: {type: DataTypes.STRING,allowNull:false},
    name_car: {type: DataTypes.CHAR,allowNull:false},
    class_car: {type: DataTypes.CHAR,allowNull:false},
    img: {type: DataTypes.STRING,allowNull:false}
})
const CarInfo = sequelize.define('car_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false}
    
})
const Driver = sequelize.define('driver',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING,unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.CHAR,unique: true},
    rating: {type: DataTypes.CHAR},
    role: {type: DataTypes.STRING,defaultValue: 'DRIVER'}
})

const Dispatcher = sequelize.define('dispatcher',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING,unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.CHAR,unique: true},
    warning: {type: DataTypes.CHAR},
    role: {type: DataTypes.STRING,defaultValue: 'DISPATCHER'}
})
const Data = sequelize.define('data',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start_place: {type: DataTypes.STRING, allowNull:false},
    end_place: {type: DataTypes.STRING, allowNull:false},
    price: {type: DataTypes.CHAR},
})
const Order = sequelize.define('order',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start_time: {type: DataTypes.DATE},
    end_time: {type: DataTypes.DATE},
    trip_rate: {type: DataTypes.DATE},
    complete: {type: DataTypes.STRING}
})

//---------Connections--------//
Car.hasMany(Driver);
Driver.belongsTo(Car)

User.hasMany(Data);
Driver.hasMany(Data);
Dispatcher.hasMany(Data);
Data.belongsTo(User);
Data.belongsTo(Driver);
Data.belongsTo(Dispatcher);

Car.hasMany(CarInfo, {as: 'info'});
CarInfo.belongsTo(Car);

Data.hasMany(Order);
Order.belongsTo(Data)

module.exports = {
    User,
    Dispatcher,
    Car,
    Driver,
    Data,
    Order
}


