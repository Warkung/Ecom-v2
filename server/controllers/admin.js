const internalErr = require("../utils/InternalError");

exports.updateOrder = async (req, res) => {
  try {
    res.send(`updateOrder`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    res.send(`getOrders`);
  } catch (error) {
    internalErr(res, error);
  }
};
