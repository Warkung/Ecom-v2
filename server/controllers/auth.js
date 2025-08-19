const internalErr = require("../utils/InternalError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) res.status(400).json({ message: "Email is required" });
    if (!password) res.status(400).json({ message: "Password is required" });

    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({
      message: "Register success",
    });
  } catch (error) {
    internalErr(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) res.status(400).json({ message: "Email is required" });

    if (!password) res.status(400).json({ message: "Password is required" });

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) res.status(400).json({ message: "User not found" });
    if (!user.enable) res.status(400).json({ message: "User not enable" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ message: "Password invalid" });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) res.status(500).json({ message: "Server Error" });
        res.status(200).json({ message: "Login Successfully", payload, token });
      }
    );
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
