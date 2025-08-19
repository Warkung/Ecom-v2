const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category");

const router = require("express").Router();

router.route("/category").post(createCategory).get(getCategories);
router.route("/category/:id").delete(deleteCategory);

module.exports = router;
