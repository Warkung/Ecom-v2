const {
  getUser,
  changeUserStatus,
  changeUserRole,
  getCart,
  deleteCart,
  addToCart,
  addUserAddress,
  placeAndOrder,
  getUserOder,
} = require("../controllers/user");

const router = require("express").Router();

router.route("/users").get(getUser);
router.route("/change-status").post(changeUserStatus);
router.route("/change-role").post(changeUserRole);
router.route("/user/cart").post(addToCart).get(getCart).delete(deleteCart);
router.route("/user/address").post(addUserAddress);
router.route("/user/order").post(placeAndOrder).all(getUserOder);

module.exports = router;
