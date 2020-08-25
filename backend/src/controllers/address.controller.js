
const Address = require("../models/address");

class AddressController {

    static async getByUser(req, res) {
        try {
            const dbAddresses = await Address.findAll(
                {
                    where: {
                        user_id: req.params.id
                    }
                }
            );
            res.json(dbAddresses);
        } catch (err) {
            res.status(422).json({errors: err});
        }
    }

    static async create(req,res){
        try{
            const dbAddresses = await Address.create(
                {
                    street: req.body.street,
                    city: req.body.city,
                    country: req.body.country,
                    post_code: req.body.post_code,
                    user_id: req.body.user_id,
                },
                {
                    fields: ['street', 'city','country','post_code','user_id']
                }
            );

            res.status(200).json(dbAddresses);

        }catch(err){
            res.status(400).json({errors: err});
        }
    }
}

module.exports = AddressController;
