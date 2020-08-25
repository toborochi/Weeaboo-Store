const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Item extends Model{}

Item.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        productid : {type:DataTypes.INTEGER,references:'products'},
        shopping_cartid : {type:DataTypes.INTEGER,references:'shopping_carts'},
        amount : DataTypes.INTEGER,
        final_price : DataTypes.REAL
    },
    {
        sequelize,
        modelName:'items',
        underscored: true,
    }
)

module.exports = Item;