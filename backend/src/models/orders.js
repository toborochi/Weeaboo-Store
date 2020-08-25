const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Order extends Model{}

Order.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        sales_price : DataTypes.REAL,
        date_created: DataTypes.DATE,
        date_dispatched: DataTypes.DATE,
        date_delivered: DataTypes.DATE,
        date_received: DataTypes.DATE,
        date_cancelled: DataTypes.DATE,
        shopping_cartid: DataTypes.INTEGER,
        payment_methodid : DataTypes.INTEGER,
        userid : DataTypes.INTEGER,
        status : DataTypes.TEXT // in-process, dispatched, in-route, received, cancelled
    },
    {
        sequelize,
        modelName:'orders'
    }
)

module.exports = Order;