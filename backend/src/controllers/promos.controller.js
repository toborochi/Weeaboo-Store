const Product = require("../models/product");
const Promos = require("../models/promos");

class PromoController {

    static async all(req, res) {
        const c = await Promos.findAll();
        res.json(c);
    }

    // Crea promociones para una lista de productos
    static async create(req, res) {

        try {
            const c = Array.from(req.body.products);

            const dbpromo = await Promos.create(
                {
                    date_start: req.body.date_start,
                    name: req.body.name,
                    description: req.body.description,
                    date_finish: req.body.date_finish,
                    discount: req.body.discount,
                },
                {
                    fields: ['date_start', 'name', 'description', 'date_finish', 'discount']
                }
            ) ;

            // Crear la relacion entre productos y promocion Iterar lista de IDS de productos
            if (c != null) {
                var i;
                for (i = 0; i < c.length; i++) {
                    const upprod = await Product.update(
                        {promo: dbpromo.id},
                        {returning: true,where:{id:c[i]}}
                    );
                }
            }

            res.json(
                {
                    tam_prom : (c.length),
                    promocion: dbpromo,
                    arr : c
                }
            );
        } catch (error) {
            console.log(error);
            res.json(req.body.products);
        }
    }

}

module.exports = PromoController;
