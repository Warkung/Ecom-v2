const internalErr = require("../utils/InternalError");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    res.send(`crate product ${title}`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    res.send(`get product by id ${id}`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    res.send(`update product id ${id}`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    res.send(`delete product by id ${id}`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getProductByFilters = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    res.send(`filters product ${sort}`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.searchWithFilters = async (req, res) => {
  try {
    const { query, price } = req.body;
    res.send(`filters product ${query}`);
  } catch (error) {
    internalErr(res, error);
  }
};
