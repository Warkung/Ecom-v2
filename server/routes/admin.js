const { updateOrder, getOrders } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router
  .route("/admin/order-status")
  .put(authCheck, adminCheck, updateOrder)
  .patch(authCheck, adminCheck, updateOrder);
router.route("/admin/orders").get(authCheck, adminCheck, getOrders);

module.exports = router;
