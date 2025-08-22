const { login, register, getCurrentUser } = require("../controllers/auth");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current-user").post(authCheck, getCurrentUser);
router.route("/current-admin").post(authCheck, adminCheck, getCurrentUser);

module.exports = router;
