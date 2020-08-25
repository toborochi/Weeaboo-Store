const Product = require('../models/product');
const ShoppingCart = require('../models/shopping_cart');
const Item = require('../models/item');
const User = require('../models/user');
const Order = require('../models/orders');

Product.belongsToMany(ShoppingCart, { through: Item,foreignKey: 'productid'});
ShoppingCart.belongsToMany(Product, { through: Item ,foreignKey: 'shopping_cartid'});


User.hasMany(Order,{foreignKey: 'userid'});
Order.belongsTo(User, {
  foreignKey: {
      name: 'userid',
  }
});



