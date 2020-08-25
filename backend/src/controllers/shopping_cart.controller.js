
const ShoppingCart = require("../models/shopping_cart");
const Product = require("../models/product");

class ShoppingCartController {

    static async create(req, res) {

        try {
            var m = new Date(Date.now());
            var today = new Date(m.toUTCString());
            var dateString = today.toISOString().split("T")[0];

            const dbShoppingCart = await ShoppingCart.create(
                {
                    sales_price: req.body.total_payment,
                    date_created: dateString
                },
                {
                    fields: ['sales_price', 'date_created']
                }
            );

            res.json(
                dbShoppingCart
            );
        } catch (error) {
            res.json(error);
        }
    }

    static async getCart(req, res) {
        try {
            const dbOrder = await ShoppingCart.findOne(
                {
                    where: {
                        id: req.params.id
                    },
                    include: [
                        {
                            model: Product,
                            through: { attributes: ['amount','final_price'] },
                            attributes: ['name','price']
                        }
                    ],
                }
            );
            res.status(200).json(dbOrder);
        } catch (err) {
            res.status(400).json(err);
        }
    }

}

module.exports = ShoppingCartController;
