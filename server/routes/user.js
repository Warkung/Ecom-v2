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
const {  authCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/user").get(authCheck, getUserById);
router
  .route("/user/cart")
  .post(authCheck, addToCart)
  .get(authCheck, getCart)
  .delete(authCheck, emptyCart);
router.route("/user/address").post(authCheck, saveAddress);
router.route("/user/order").post(authCheck, saveOrder).get(authCheck, getOrder);

module.exports = router;
