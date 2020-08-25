
const PaymentMethod = require("../models/payment_method");
const Product = require("../models/product");

class PaymentMethodController {

    static async getByUser(req,res){
        try {
            const methodDB = await PaymentMethod.findAll(
                {
                    where: {
                        userid: req.params.id
                    }
                }
            );
            res.status(200).json(methodDB);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }


    static async create(req, res) {

        try {
            const dbMethod = await PaymentMethod.create(
                {
                    userid : req.body.userid,
                    card_number : req.body.number,
                    exp_year:req.body.year,
                    exp_month: req.body.month,
                    cvc: req.body.cvc,
                },
                {
                    fields: ['userid', 'card_number','exp_year','exp_month','cvc'],
                }
            );
            res.status(200).json(dbMethod);

        } catch (err) {
            res.status(400).json({
                error: err
            });
        }
    }

}

module.exports = PaymentMethodController;
