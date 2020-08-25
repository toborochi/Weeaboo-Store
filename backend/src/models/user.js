const {DataTypes,Model} =  require('sequelize');
const sequelize = require('../database/database');

class User extends Model{}

User.init(
    {
        id : {type : DataTypes.INTEGER,primaryKey : true},
        username : DataTypes.TEXT,
        password: DataTypes.TEXT,
        email: DataTypes.TEXT,
        contact_information: DataTypes.TEXT,
        role: DataTypes.INTEGER,
        session_tok : DataTypes.TEXT
    },
    {
        sequelize,
        modelName:'users'
    }
)

module.exports = User;
