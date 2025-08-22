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
} = require("../controllers/user");

const router = require("express").Router();

router.route("/users").get(getAllUsers);
router.route("/change-status").post(changeUserStatus);
router.route("/change-role").post(changeUserRole);
router.route("/user/cart").post(addToCart).get(getCart).delete(emptyCart);
router.route("/user/address").post(saveAddress);
router.route("/user/order").post(saveOrder).get(getOrder);

module.exports = router;
