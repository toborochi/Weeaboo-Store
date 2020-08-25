const Product = require("../models/product");
const CategoryProduct = require('../models/relations/category_product');
const sequelize = require('../database/database');
const Sequelize = require('sequelize');
const Item = require("../models/item");
const stripe = require('stripe')(process.env.STRIPE);

class ProductController {

    static async getProductReport(req,res){
        try{
           
            const dbItem = await Item.findAll();
            const dbProd = await Product.findAll();

            let tmpTotal =0;
            let tmpStock =0;
            let products = new Array();
            
            for(let i=0;i<dbProd.length;++i){
                tmpStock=0;
                tmpTotal=0;
                let pid = dbProd[i].id;
                let prd = dbProd[i];
                for(let j=0;j<dbItem.length;++j){
                    let pItem = dbItem[j];
                    if(pid===pItem.productid){
                        tmpStock=tmpStock + pItem.amount;
                        tmpTotal=tmpTotal + pItem.final_price;
                    }
                }
                products.push({
                    product: prd,
                    total_sell : tmpTotal,
                    total_stock : tmpStock
                });
                
            }

            res.status(200).json(products);
           
        }catch(err){
            res.status(400).json(err);
        }
    }


    static async all(req, res) {
        const c = await Product.findAll();
        res.json(c);
    }

    static async findOne(req,res){
        const c = await Product.findByPk(req.params.id);
        res.json(c);
    }
    // Crea productos Individualmente
    static async create(req, res) {

        //TODO - Falta ver esto de acá
        let x = [];
        try {

            const c = Array.from(req.body.categories);

            const prod = await stripe.products.create(
                {
                    name: req.body.name,
                    images: [
                        req.body.image_url
                    ],
                }
            );

			// Crea productos en stripe (ES OPCIONAL) de hecho posiblemente ni se necesite
            const pri = await stripe.prices.create(
                {
                    unit_amount: req.body.price * 100,
                    currency: 'bob',
                    product: prod.id
                }
            );

            const dbprod = await Product.create(
                {
                    code: prod.id,
                    name: req.body.name,
                    description: req.body.description,
                    stock: req.body.stock,
                    price: req.body.price,
                    image_url: req.body.image_url,
                    promo : req.body.promo
                },
                {
                    fields: ['code', 'name', 'description', 'stock', 'price', 'image_url','promo']
                }
            );

            
            if (dbprod != null) {
                if (c != null && c.length > 0) {
                    var i;
                    for (i = 0; i < c.length; i++) {
                        
                        x.push({
                            productID: dbprod.id,
                            categoryID: c[i]
                        });
                        
                        const dbPromoProduct = await CategoryProduct.create(
                            {
                                productid: dbprod.id,
                                categoryid: c[i]
                            },
                            {
                                fields: ['productid', 'categoryid']
                            }
                        );
                    }
                }
            }
            

            res.json({
                p: prod,
                pric: pri,
                dbp: dbprod,
                cates: c,
                xcategories: x
            });
        } catch (error) {
            res.json(x);
        }
    }


    static async getByCategory(req, res) {

        try {
            const dbprod = await sequelize.query(
                `
                SELECT * FROM products
                WHERE id IN (
	            SELECT productId FROM category_products
	            WHERE categoryId in (
		        SELECT id FROM categories
		        WHERE id = '${req.params.cat}'
	         )
            )`,
            {
                model : Product,
                mapToModel: true
            }
            );

            res.json(dbprod);
        }
        catch (error) {
            console.log(error);
        }
    }


    static async getByName(req, res) {
        try{
            const dbprod = await sequelize.query(
                `SELECT * FROM products WHERE LOWER(name) like LOWER('%${req.params.name}%') OR LOWER(description) like LOWER('%${req.params.name}%')`,
            {
                model : Product,
                mapToModel: true
            }
            );
            res.json(dbprod);
        }catch(error){
            console.log(error);
        }
    }

    static async getByPromo(req, res) {
        try{
            const dbprod = await sequelize.query(
                `
                SELECT * FROM products
                WHERE promo is not null and promo in (
            	SELECT id FROM promos
	            WHERE NOW()>=date_start AND NOW()<=date_finish
                )
                `,
                {
                    model : Product,
                    mapToModel: true,
                }
            );
            res.json(dbprod);
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = ProductController;
