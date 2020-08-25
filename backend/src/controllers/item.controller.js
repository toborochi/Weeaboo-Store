
const Item = require("../models/item");

class ItemController {

  static async all(req, res) {
    const c = await Item.findAll();
    res.json(c);
  }
}

module.exports = ItemController ;
