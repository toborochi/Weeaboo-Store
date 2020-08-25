
const Order = require("../models/orders");
const Product = require("../models/product");
const ShoppingCart = require("../models/shopping_cart");
const Item = require("../models/item");
const sequelize = require("../database/database");
const User = require("../models/user");

class OrderController {

    static async all(req, res) {
        try {
            const ordDB = await Order.findAll({
                include: {
                    model: User,
                    attributes: ['id','username','email']
                },    
                attributes: ['id','sales_price','date_created','shopping_cartid','payment_methodid','userid','status'],
            }
            );
            res.status(200).json(ordDB);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async getByUser(req,res){
        try {
            const ordDB = await Order.findAll(
                {
                    where: {
                        userid: req.params.id
                    },
                    attributes: {
                        exclude: ['userId']
                    }
                }
            );
            res.status(200).json(ordDB);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    static async update(req, res) {

        try {
            var dbOrder;
            var m = new Date(Date.now());
            var today = new Date(m.toUTCString());
            var dateString = today.toISOString().split("T")[0];
            // in-process, dispatched, in-route, received, cancelled
            switch (req.body.status) {

               

                case "dispatched":

                    dbOrder = await Order.update({
                        date_dispatched: dateString,
                        status: "dispatched"

                    }, {
                        where: { id: req.params.id }
                    });
                    break;

                case "in-route":

                    dbOrder = await Order.update({
                        date_delivered: dateString,
                        status: "in-route"

                    }, {
                        where: { id: req.params.id }
                    });
                    break;

                case "received":

                    dbOrder = await Order.update({
                        date_received: dateString,
                        status: "received"

                    }, {
                        where: { id: req.params.id }
                    });
                    break;

                case "cancelled":

                    dbOrder = await Order.update({
                        date_cancelled: dateString,
                        status: "cancelled"

                    }, {
                        where: { id: req.params.id }
                    });
                    break;
            }
            res.status(200).json({status: "updated"});
        } catch (err) {
            res.status(400).json({error: err});
        }

    }

    static async create(req, res) {

        try {

            let result = await sequelize.transaction(async (t) => {

                // Revisamos cada fila
                var flag = true;
                var productList = req.body.products;
                var ot = [];
                var productsDB = [];
                for (var i = 0; i < productList.length && flag; ++i) {
                    const prod = productList[i];
                    const p = await Product.findByPk(prod.id, { transaction: t });
                    if (p != null) {
                        if (prod.inCart > p.stock) {
                            ot.push(prod);
                            flag = false;
                        } else {
                            productsDB.push(p);
                            Product.update({
                                stock: p.stock - prod.inCart
                            }, {
                                where: { id: prod.id }
                            })
                        }
                    }
                }

                if (!flag) {
                    throw new Error('Rollback initiated');
                }

                var paymentFlag = true; // Por ahora siempre admite los pagos

                if (!paymentFlag) {
                    throw new Error('Rollback initiated');
                }

                var m = new Date(Date.now());
                var today = new Date(m.toUTCString());
                var dateString = today.toISOString().split("T")[0];

                const dbShoppingCart = await ShoppingCart.create(
                    {
                        sales_price: req.body.total_payment,
                        date_created: dateString
                    },
                    {
                        fields: ['sales_price', 'date_created'],
                        transaction: t
                    }
                );

                for (var i = 0; i < productsDB.length; ++i) {
                    const prod = productList[i];
                    const prodDB = productsDB[i];

                    const finalPrice = prodDB.price * prod.inCart;

                    const dbItem = await Item.create(
                        {
                            productid: prod.id,
                            shopping_cartid: dbShoppingCart.id,
                            amount: prod.inCart,
                            final_price: finalPrice
                        },
                        {
                            fields: ['productid', 'shopping_cartid', 'amount', 'final_price'],
                            transaction: t
                        }
                    );
                }
/*
                const dbOrder = await sequelize.query(
                    `INSERT INTO orders(sales_price,date_created,date_dispatched,date_delivered,date_received,date_cancelled,shopping_cartid,payment_methodid,userid,status) VALUES (${req.body.total_payment},"${dateString}",NULL,NULL,NULL,NULL,${dbShoppingCart.id},${ req.body.payment_method},${req.body.userid,"in-process"})`,
                    {
                        transaction: t
                    }
                );*/
                    
                const dbOrder = await Order.create(
                    {
                        sales_price: req.body.total_payment,
                        date_created: dateString,
                        date_dispatched: null,
                        date_delivered: null,
                        date_received: null,
                        date_cancelled: null,
                        shopping_cartid: dbShoppingCart.id,
                        payment_methodid: req.body.payment_method,
                        userid: req.body.userid,
                        status: "in-process"// in-process, dispatched, in-route, received, cancelled
                    },
                    {
                        fields: ['sales_price', 'date_created', 'date_dispatched', 'date_delivered', 'date_received',
                            'date_cancelled', 'shopping_cartid', 'payment_methodid', 'userid', 'status'],
                        transaction: t,
                        
                    }
                );


                return {
                    proccessed: flag,
                    products: productList,
                    rejected_products: ot,
                    order: "falla"
                };
            });



            // Ver que todos los productos esten disponibles
            // Si es así, verificar metodo de pago
            // Crear carrito de compras
            // Crear los items
            // Crear el pedido

            res.json(result);
        } catch (err) {
            res.json({
                error: err,
                msg: "NOPE"
            });
        }


    }

}

module.exports = OrderController;
