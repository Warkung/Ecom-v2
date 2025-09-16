const { payment } = require("../controllers/stripe");
const { authCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/create-payment-intent").post(authCheck, payment);

module.exports = router;
