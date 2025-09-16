const internalErr = require("../utils/InternalError");
const prisma = require("../config/prisma");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ message: "Get users success", users });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.user.id),
      },
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        enabled: Boolean(enabled),
      },
    });
    res.status(200).json({ message: `Update status`, enabled });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        role: role,
      },
    });
    res.status(200).json({ message: `Update role to ${role}` });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    // delete old product on cart
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderedById: user.id,
        },
      },
    });

    // delete old cart
    await prisma.cart.deleteMany({
      where: {
        orderedById: user.id,
      },
    });

    // เตรียม product
    let products = cart.map((product) => ({
      productId: product.id,
      count: product.count,
      price: product.price,
    }));

    // หาผลรวม
    let cartTotal = products.reduce(
      (total, product) => total + product.price * product.count,
      0
    );

    // สร้าง cart
    let newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });
    res.status(200).send(newCart);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: parseInt(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) return res.status(404).send("Cart not found");
    res.status(200).send({ cart });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: parseInt(req.user.id),
      },
    });
    if (!cart) return res.status(404).send("Cart not found");

    const product = await prisma.productOnCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    });
    res
      .status(200)
      .json({ message: "Cart is empty", product_count_deleted: product.count });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;
    await prisma.user.update({
      where: {
        id: parseInt(req.user.id),
      },
      data: {
        address: address,
      },
    });

    res.status(200).send("Update address success");
  } catch (error) {
    internalErr(res, error);
  }
};

exports.saveOrder = async (req, res) => {
  try {
    const { id, currency, amount, status } = req.body.paymentIntent;

    const userCart = await prisma.cart.findFirst({
      where: {
        orderedById: parseInt(req.user.id),
      },
      include: {
        products: true,
      },
    });

    // Check Cart empty
    if (!userCart || userCart.products.length === 0) {
      return res.status(404).send("Cart not found");
    }

    //Check quantity
    // for (let item of userCart.products) {
    //   const product = await prisma.product.findUnique({
    //     where: { id: item.productId },
    //     select: { title: true, quantity: true },
    //   });
    //   if (product.quantity === 0)
    //     return res.status(400).send(`${product.title} is out of stock`);
    //   if (!product || product.quantity < item.count) {
    //     return res
    //       .status(400)
    //       .send(` There are ${product.quantity} ${product.title} left.`);
    //   }
    // }

    // create new order
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: {
          connect: {
            id: parseInt(req.user.id),
          },
        },
        cartTotal: userCart.cartTotal,
        stripePaymentId: id,
        currency: currency,
        amount: Number(amount) / 100,
        status: status,
      },
    });

    const updateProductPromises = userCart.products.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: {
          quantity: { decrement: item.count },
          sold: { increment: item.count },
        },
      })
    );
    await prisma.$transaction(updateProductPromises);
    await prisma.cart.delete({
      where: {
        id: userCart.id,
      },
    });
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    res.status(200).json({ message: "Save order success", order });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderedById: parseInt(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!orders) res.status(404).send("Order not found");
    res.status(200).send(orders);
  } catch (error) {
    internalErr(res, error);
  }
};
