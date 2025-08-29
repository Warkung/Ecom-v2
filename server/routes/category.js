const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router
  .route("/category")
  .post(authCheck, adminCheck, createCategory)
  .get(getCategories);
router.route("/category/:id").delete(authCheck, adminCheck, deleteCategory);

module.exports = router;
