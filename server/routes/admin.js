const { updateOrder, getOrders } = require("../controllers/admin");

const router = require("express").Router();

router.route("/admin/order-status").put(updateOrder).patch(updateOrder);
router.route("/admin/orders").get(getOrders);

module.exports = router;
