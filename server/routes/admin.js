const {
  getOrders,
  changeOrderStatus,
  getAllUsers,
  changeUserStatus,
  changeUserRole,
} = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/users").get(authCheck, adminCheck, getAllUsers);
router
  .route("/admin/order-status")
  .put(authCheck, adminCheck, changeOrderStatus)
  .patch(authCheck, adminCheck, changeOrderStatus);
router.route("/admin/orders").get(authCheck, adminCheck, getOrders);
router.route("/change-status").post(authCheck, adminCheck, changeUserStatus);
router.route("/change-role").post(authCheck, adminCheck, changeUserRole);

module.exports = router;
