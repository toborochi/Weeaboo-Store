const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Address extends Model{}

Address.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        street: DataTypes.TEXT,
        city: DataTypes.TEXT,
        country: DataTypes.TEXT,
        post_code: DataTypes.TEXT,
        user_id : DataTypes.INTEGER
    },
    {
        sequelize,
        modelName:'addresses'
    }
)

module.exports = Address;