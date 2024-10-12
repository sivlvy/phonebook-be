const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

require("dotenv").config();

const { JWT_SECRET } = process.env;

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isAlready = await User.findOne({ where: { email } });

  if (isAlready) {
    throw HttpError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, name, password: hashedPassword });

  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    JWT_SECRET,
    { expiresIn: "23h" },
  );

  await User.update({ access_token: token }, { where: { id: newUser.id } });

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      access_token: token,
    },
  });
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(404, "Email or password is incorrect");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw HttpError(401, "Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "23h" },
  );

  await User.update({ access_token: token }, { where: { id: user.id } });

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

const signOutUser = async (req, res) => {
  const { id } = req.user;

  await User.update({ token: "" }, { where: { id } });

  res.status(204).json({ message: "Logout successful" });
};

const currentUser = (req, res) => {};

module.exports = {
  signUpUser: ctrlWrapper(signUpUser),
  signInUser: ctrlWrapper(signInUser),
  signOutUser: ctrlWrapper(signOutUser),
  currentUser: ctrlWrapper(currentUser),
};
