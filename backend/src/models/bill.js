const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Bill extends Model{}

Bill.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        date_created: DataTypes.DATE,
        client_id : DataTypes.INTEGER,
        user_id : DataTypes.INTEGER,
        payment_id : DataTypes.INTEGER
    },
    {
        sequelize,
        modelName:'bills'
    }
)

module.exports = Bill;