const prisma = require("../config/prisma");
const internalErr = require("../utils/InternalError");
const cloudinary = require("cloudinary").v2;

// Config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    const productExists = await prisma.product.findFirst({
      where: {
        title: title,
      },
    });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => {
            return {
              asset_id: item.asset_id,
              public_id: item.public_id,
              url: item.url,
              secure_url: item.secure_url,
            };
          }),
        },
      },
    });

    res.status(200).send(product);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.upLoadImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: "ecommerce",
    });
    res.send(result);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.removeImages = async (req, res) => {
  try {
    const { public_id } = req.body;
    await cloudinary.uploader.destroy(public_id, () =>
      res.send("Delete success")
    );

    res.send("Delete success");
  } catch (error) {
    internalErr(res, error);
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        images: true,
      },
    });
    res.status(200).send(products);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).send(product);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    await prisma.image.deleteMany({
      where: {
        productId: parseInt(id),
      },
    });

    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => {
            return {
              asset_id: item.asset_id,
              public_id: item.public_id,
              url: item.url,
              secure_url: item.secure_url,
            };
          }),
        },
      },
    });

    res.status(200).json({ message: "Update success", product });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        images: true,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const deletedImages = product.images.map((image) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(image.public_id, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
      });
    });
    await Promise.all(deletedImages);

    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.listProductBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await prisma.product.findMany({
      orderBy: {
        [sort]: order,
      },
      take: parseInt(limit),
      include: {
        Category: true,
        images: true,
      },
    });
    res.status(200).json({ message: { sort, order, limit }, products });
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
