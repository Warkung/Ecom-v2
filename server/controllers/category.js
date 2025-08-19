const internalErr = require("../utils/InternalError");

exports.createCategory = async (req, res) => {
  try {
    res.send("hello create category");
  } catch (error) {
    internalErr(res.error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    res.send("hello get category");
  } catch (error) {
    internalErr(res.error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    res.send("delete category id " + id);
  } catch (error) {
    internalErr(res.error);
  }
};
