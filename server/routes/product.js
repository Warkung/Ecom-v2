const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  listProductBy,
  searchWithFilters,
  listProducts,
} = require("../controllers/product");

const router = require("express").Router();

router.route("/product").post(createProduct);
router.route("/products/:count").get(listProducts);
router
  .route("/product/:id")
  .get(getProductById)
  .patch(updateProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/productby").post(listProductBy);
router.route("/search/filters").post(searchWithFilters);

module.exports = router;
