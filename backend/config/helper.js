const User = require("../src/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports ={
    hasAuthFields: (req, res, next) => {
        let errors = [];

        if (req.body) {
            if (!req.body.email) {
                errors.push('Missing email field');
            }
            if (!req.body.password) {
                errors.push('Missing password field');
            }

            if (errors.length) {
                return res.status(400).send({errors: errors.join(',')});
            } else {
                return next();
            }
        } else {
            return res.status(400).send({errors: 'Missing email and password fields'});
        }
    },
    isPasswordAndUserMatch: async (req, res, next) => {

        try{
        const plain_password = req.body.password;
        const user_email = req.body.email;          
              

        const user = await User.findOne({
            where: { username: user_email.split("@")[0] }
          });


        if (user) {
            const match = await bcrypt.compare(plain_password, user.password);
            
            if (match) {
                req.id = user.id;
                req.username = user.username;
                req.email = user.email;
                req.role = user.role;
                next();
            } else {
                res.status(401).json({message: "Username o contrasena incorrecta", status: false});
            }
            
        } else {
            res.status(401).json({message: "Username o contrasena incorrecta", status: false});
        }
            }catch(err){
                res.status(401).json({message: "Error al conectarse", status: false});
            }
	}   

};