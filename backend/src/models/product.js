const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Product extends Model{}

Product.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        code : DataTypes.TEXT,
        name :DataTypes.TEXT,
        description : DataTypes.TEXT,
        stock : DataTypes.INTEGER,
        price : DataTypes.REAL,
        image_url : DataTypes.TEXT,
        promo: DataTypes.INTEGER
    },
    {
        sequelize,
        modelName:'products',
        
    }
)




module.exports = Product;