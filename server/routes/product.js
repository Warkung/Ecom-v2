const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByFilters,
  searchWithFilters,
} = require("../controllers/product");

const router = require("express").Router();

router.route("/product").post(createProduct);
router
  .route("/product/:id")
  .get(getProductById)
  .patch(updateProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/productby").post(getProductByFilters);
router.route("/search/filters").post(searchWithFilters);

module.exports = router;
