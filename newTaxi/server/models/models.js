const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    email: {type: DataTypes.STRING,unique: true,allowNull:false},
    password: {type: DataTypes.STRING},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },  
    phone: {type: DataTypes.CHAR(15),primaryKey: true,unique: true},
    role: {type: DataTypes.STRING,defaultValue: 'USER'}
})

const Car = sequelize.define('car',{
    number_car: {type: DataTypes.STRING,primaryKey: true,allowNull:false},
    name_car: {type: DataTypes.STRING,allowNull:false},
    class_car: {type: DataTypes.CHAR,allowNull:false},
    phone: { type: DataTypes.CHAR, allowNull: false },
    isCompanyCar: { type: DataTypes.BOOLEAN, defaultValue: false },
    img: {type: DataTypes.STRING,allowNull:false}
    
})
const CarInfo = sequelize.define('car_info',{
    number_car: {type: DataTypes.STRING, primaryKey: true, allowNull:false},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false}
})
const Driver = sequelize.define('driver',{
    email: {type: DataTypes.STRING,unique: true,allowNull:false},
    password: {type: DataTypes.STRING},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },  
    phone: {type: DataTypes.CHAR(15),primaryKey: true,unique: true},
    rating: {type: DataTypes.CHAR},
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {type: DataTypes.STRING,defaultValue: 'DRIVER'}
})

const Dispatcher = sequelize.define('dispatcher',{
    email: {type: DataTypes.STRING,unique: true,allowNull:false},
    password: {type: DataTypes.STRING},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },  
    phone: {type: DataTypes.CHAR(15),unique: true,primaryKey: true,unique: true},
    warning: {type: DataTypes.CHAR},
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {type: DataTypes.STRING,defaultValue: 'DISPATCHER'}
})
const Order = sequelize.define('order',{
    idOrder: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull:false},
    start_time: {type: DataTypes.DATE},
    end_time: {type: DataTypes.DATE},
    trip_rate: {type: DataTypes.CHAR},
    start_place: {type: DataTypes.STRING, allowNull:false},
    end_place: {type: DataTypes.STRING, allowNull:false},
    price: {type: DataTypes.CHAR},
    complete: {type: DataTypes.STRING},
    comment: { type: DataTypes.STRING }
})

//---------Connections--------//
Driver.hasMany(Car, { foreignKey: 'phone' });
Car.belongsTo(Driver, { foreignKey: 'phone' });

User.hasMany(Order);
Driver.hasMany(Order);
Dispatcher.hasMany(Order);
Order.belongsTo(User);
Order.belongsTo(Driver);
Order.belongsTo(Dispatcher);

Car.hasMany(CarInfo, {foreignKey: 'number_car', as: 'info'});
CarInfo.belongsTo(Car,{ foreignKey: 'number_car' });

module.exports = {
    User,
    Dispatcher,
    Car,
    Driver,
    Order
}