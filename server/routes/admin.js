const { getOrders, changeOrderStatus } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router
  .route("/admin/order-status")
  .put(authCheck, adminCheck, changeOrderStatus)
  .patch(authCheck, adminCheck, changeOrderStatus);
router.route("/admin/orders").get(authCheck, adminCheck, getOrders);

module.exports = router;
