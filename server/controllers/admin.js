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
    res.status(200).send(users);
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

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) return res.status(404).send("Order not found");
    const orderUpdate = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus,
      },
    });
    res.send(orderUpdate);
  } catch (err) {
    internalErr(res, err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        orderedBy: {
          select: {
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });
    res.status(200).send(orders);
  } catch (error) {
    internalErr(res, error);
  }
};
