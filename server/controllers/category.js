const prisma = require("../config/prisma");
const internalErr = require("../utils/InternalError");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const checkCategory = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    if (checkCategory)
      return res.status(400).json({ message: "Category already exists" });

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(200).json({ message: "Create category successfully" });
  } catch (error) {
    internalErr(res.error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res
      .status(200)
      .json({ message: "List categories success", categories });
  } catch (error) {
    internalErr(res.error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const checkCategory = await prisma.category.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!checkCategory)
      return res.status(404).json({ message: "Category not found" });

    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: `Delete category success`, category });
  } catch (error) {
    internalErr(res.error);
  }
};
