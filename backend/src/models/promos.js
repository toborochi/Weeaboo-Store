const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class Promos extends Model{}

Promos.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        name : DataTypes.TEXT,
        description : DataTypes.TEXT,
        date_start :DataTypes.DATE,
        date_finish :DataTypes.DATE,
        discount : DataTypes.REAL
    },
    {
        sequelize,
        modelName:'promos'
    }
)



module.exports = Promos;