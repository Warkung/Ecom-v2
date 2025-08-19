const internalErr = require("../utils/InternalError");

exports.register = async (req, res) => {
  try {
    res.send("hello register");
  } catch (error) {
    internalErr(res, error);
  }
};

exports.login = (req, res) => {
  try {
    res.send("Hello login");
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getCurrentUser = (req, res) => {
  try {
    res.send("Hello getCurrentUser");
  } catch (error) {
    internalErr(res, error);
  }
};
