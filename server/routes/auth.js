const { login, register, getCurrentUser } = require("../controllers/auth");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current-user").post(getCurrentUser);
router.route("/current-admin").post(getCurrentUser);

module.exports = router;
