const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  listProductBy,
  searchWithFilters,
  listProducts,
  upLoadImages,
  removeImages,
} = require("../controllers/product");
const { adminCheck, authCheck } = require("../middlewares/authCheck");

const router = require("express").Router();

router.route("/product").post(authCheck, adminCheck, createProduct);
router.route("/products/:count").get(listProducts);
router
  .route("/product/:id")
  .get(getProductById)
  .patch(authCheck, adminCheck, updateProduct)
  .put(authCheck, adminCheck, updateProduct)
  .delete(authCheck, adminCheck, deleteProduct);
router.route("/productby").post(listProductBy);
router.route("/search/filters").post(searchWithFilters);

router.route("/images/upload").post(authCheck, adminCheck, upLoadImages);
router.route("/images/remove").delete(authCheck, adminCheck, removeImages);

module.exports = router;
