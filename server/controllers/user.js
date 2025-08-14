const internalErr = require("../utils/InternalError");

exports.getUser = async (req, res) => {
  try {
    res.send(`get users`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    res.send(`changeUserStatus`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    res.send(`changeUserRole`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    res.send(`addToCart`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getCart = async (req, res) => {
  try {
    res.send(`getCart`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    res.send(`deleteCart`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.addUserAddress = async (req, res) => {
  try {
    res.send(`addUserAddress`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.placeAndOrder = async (req, res) => {
  try {
    res.send(`placeAndOrder`);
  } catch (error) {
    internalErr(res, error);
  }
};

exports.getUserOder = async (req, res) => {
  try {
    res.send(`getUserOder`);
  } catch (error) {
    internalErr(res, error);
  }
};
