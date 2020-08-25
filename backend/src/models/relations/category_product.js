const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../../database/database');

class CategoryProduct extends Model{}

CategoryProduct.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        productid : DataTypes.INTEGER,
        categoryid : DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName:'category_products'
    }
)

module.exports = CategoryProduct;