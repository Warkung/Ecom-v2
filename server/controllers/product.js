const prisma = require("../config/prisma");
const internalErr = require("../utils/InternalError");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    const productExists = await prisma.product.findFirst({
      where: {
        title: title,
      },
    });
    if (productExists) return res.status(400).send("Product already exists");

    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images,
      },
    });

    res.status(200).json({ message: "Create product success", product });
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
