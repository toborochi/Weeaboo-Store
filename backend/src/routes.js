//"use strict";
const { Router } = require("express");
const { check, body } = require('express-validator');
const CategoryController = require("./controllers/category.controller");
const ProductController = require("./controllers/product.controller");
const PromosController = require("./controllers/promos.controller");
const ItemsController = require("./controllers/item.controller");
const AuthController = require("./controllers/auth.controller");
const ShoppingCartController = require("./controllers/shopping_cart.controller");
const OrderController = require("./controllers/order.controller");
const AddressController = require("./controllers/address.controller");
const PaymentMethodController = require("./controllers/payment_method.controller");

const User = require("./models/user");
const helper = require("../config/helper");

class MyRouter {
  constructor() {
    this.router = Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.router
      // TEST ROUTE
      .get("/test", (req, res) => { res.json("Hola"); })

      //CATEGORY
      .get("/categories", CategoryController.all)

      // PRODUCTS
      .post("/products", ProductController.create) // Crear Productos
      .get("/products_report", ProductController.getProductReport) // Crear Productos
      .get("/products", ProductController.all)     // Obtener los productos
      .get("/products/category/:cat", ProductController.getByCategory)
      .get("/products/name/:name", ProductController.getByName)
      .get("/products/search/:id", ProductController.findOne)
      .get("/products/promo", ProductController.getByPromo)

      // ADDRESSES
      .get("/address/user/:id", AddressController.getByUser)
      .post("/address", AddressController.create)

      // PROMOS
      .post("/promos", PromosController.create) // Crear promos
      .get("/promos", PromosController.all)     // Obtener las promos

      // ITEMS
      .get("/items", ItemsController.all)

      .post('/shopping_cart',ShoppingCartController.create)
      .get('/shopping_cart/user/:id',ShoppingCartController.getCart)

      // ORDERS
      .post('/orders',OrderController.create)
      .post('/orders/change/:id',OrderController.update)
      .get('/orders',OrderController.all)
      .get('/orders/user/:id',OrderController.getByUser)
      

      // PAYMENT METHODS
      .post('/payment_method',PaymentMethodController.create)
      .get('/payment_method/user/:id',PaymentMethodController.getByUser)

      // AUTH
      .post('/session',AuthController.checkSession)

      .post('/register', [
        check('email').isEmail().not().isEmpty().withMessage('El campo no puede estar vacio.')
          .normalizeEmail({ all_lowercase: true }),
        check('password').escape().trim().not().isEmpty().withMessage('El campo no puede estar vacio.')
          .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres."),
        body('email').custom(value => {
          try {
            return User.findOne({
              where: { username: value.split("@")[0] }
            }).then(user => {
              if (user) {
                return Promise.reject('Email / Usuario ya existe.');
              }
            })
          } catch (error) {
            return Promise.reject('Email / Usuario ya existe.');
          }


        })
      ], AuthController.registerUser)
      .post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], AuthController.loginUser);
  }
}
const myRouter = new MyRouter();
module.exports = { myRouter };
