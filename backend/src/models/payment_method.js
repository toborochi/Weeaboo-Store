const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class PaymentMethod extends Model{}

PaymentMethod.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        userid : DataTypes.INTEGER,
        card_number : DataTypes.TEXT,
        exp_year: DataTypes.INTEGER,
        exp_month: DataTypes.INTEGER,
        cvc: DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName:'payment_methods'
    }
)



module.exports = PaymentMethod;