const { myRouter } = require("../src/routes");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("../src/database/database");
require('../src/database/associations');

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api", myRouter.router);
    this.app.get("/", (req, res) => {
      res.send(`<center><img src=https://thumbs.gfycat.com/RectangularTastyBongo-max-1mb.gif></center>`);
    });
  }

  start(port) {
    this.app.listen(port);
    sequelize.authenticate().then(()=>{
      console.log("Conectado a la BD");
    }).catch(error =>{
      console.log("Error producido al conectar: ",error);
    });
  }
}

module.exports = { App };
