
const Category = require("../models/category");

class CategoryController {

  static async all(req, res) {
    const c = await Category.findAll();
    res.json(c);
  }
}

module.exports = CategoryController ;
