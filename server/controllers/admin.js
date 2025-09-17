const internalErr = require("../utils/InternalError");
const prisma = require("../config/prisma");

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
