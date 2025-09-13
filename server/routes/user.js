const {
  getAllUsers,
  changeUserStatus,
  changeUserRole,
  getCart,
  emptyCart,
  addToCart,
  saveAddress,
  saveOrder,
  getOrder,
  getUserById,
} = require("../controllers/user");
const { adminCheck, authCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/users").get(getAllUsers);
router.route("/user").get(authCheck, getUserById);
router.route("/change-status").post(changeUserStatus);
router.route("/change-role").post(changeUserRole);
router
  .route("/user/cart")
  .post(authCheck, addToCart)
  .get(authCheck, getCart)
  .delete(authCheck, emptyCart);
router.route("/user/address").post(authCheck, saveAddress);
router.route("/user/order").post(saveOrder).get(getOrder);

module.exports = router;
