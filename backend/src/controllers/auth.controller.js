const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'aca_va_tu_clave_secreta_puede_estar_en_ENV';

class AuthController {

  static async checkSession(req, res) {

    try {
      var check = jwt.verify(req.body.token, SECRET_KEY);

      if (check) {
        const dbUser = await User.findOne({
          where: {
            session_tok: req.body.token
          }
        });

        res.status(200).json({
          id: dbUser.id,
          username: dbUser.username,
          email: dbUser.email,
          role: dbUser.role,
          token: req.body.token,
          expiration : 60*60*24

        });

      }else{

      }

    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  static async loginUser(req, res) {

    let expiresIn = 24 * 60 * 60; // 24Hrs
    const tok = jwt.sign({ userID: req.id, username: req.username },
      SECRET_KEY, {
      expiresIn: expiresIn
    });

    const dbUserUpdateToken = await User.update({
      session_tok: tok

    }, {
      where: { id: req.id }
    });

    res.json({
      id: req.id,
      username: req.username,
      email: req.body.email,
      role: req.role,
      token: tok,
      expiration: expiresIn
    });
  }

  static async registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {

      let bemail = req.body.email;
      let busername = bemail.split("@")[0];
      let bpassword = await bcrypt.hash(req.body.password, 10);

      const dbUser = await User.create(
        {
          username: busername,
          password: bpassword,
          email: bemail,
          contact_information: '',
          role: 555,
          session_tok: null

        },
        {
          fields: ['username', 'password', 'email', 'contact_information', 'role', 'session_tok']
        }
      );

      let expiresIn = 24 * 60 * 60; // 24Hrs
      const tok = jwt.sign({ userID: dbUser.id, username: dbUser.username },
        SECRET_KEY, {
        expiresIn: expiresIn
      });

      const dbUserUpdateToken = await User.update({
        session_tok: tok

      }, {
        where: { id: dbUser.id }
      });

      res.json({
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        role: dbUser.role,
        token: tok,
        expiration: expiresIn
      });
    }
  }
}

module.exports = AuthController;
