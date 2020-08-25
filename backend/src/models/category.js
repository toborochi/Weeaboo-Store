const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Category extends Model{}

Category.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        name :DataTypes.TEXT,
        image_url : DataTypes.TEXT
    },
    {
        sequelize,
        modelName:'categories'
    }
)



module.exports = Category;