const {
  login,
  register,
  getCurrentUser,
  getCurrentAdmin,
} = require("../controllers/auth");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current-user").post(getCurrentUser);
router.route("/current-admin").post(getCurrentAdmin);

module.exports = router;
