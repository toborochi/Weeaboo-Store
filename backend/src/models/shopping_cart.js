const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class ShoppingCart extends Model{}

ShoppingCart.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        sales_price : DataTypes.REAL,
        date_created: DataTypes.DATE,
    },
    {
        sequelize,
        modelName:'shopping_carts',
        
    }
)

module.exports = ShoppingCart;