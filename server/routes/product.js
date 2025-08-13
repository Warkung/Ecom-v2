const { getproduct } = require("../controllers/product");

const router = require("express").Router();

router.route("/product").get(getproduct);

module.exports = router;
