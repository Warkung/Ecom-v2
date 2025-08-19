const prisma = require("../config/prisma");
const internalErr = require("../utils/InternalError");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    if (category.name === name)
      res.status(400).json({ message: "Category already exists" });

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
    if (!checkCategory) res.status(404).json({ message: "Category not found" });
    console.log(checkCategory);

    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: `${category.name} deleted` });
    res.send("hello");
  } catch (error) {
    internalErr(res.error);
  }
};
