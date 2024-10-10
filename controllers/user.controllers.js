const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  console.log(hashedPassword);
  const newUser = await User.create({ email, name, password: hashedPassword });
  console.log(password);
  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    JWT_SECRET,
    { expiresIn: "23h" },
  );

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};

const signInUser = (req, res) => {};

const signOutUser = (req, res) => {};

const currentUser = (req, res) => {};

module.exports = {
  signUpUser: ctrlWrapper(signUpUser),
  signInUser: ctrlWrapper(signInUser),
  signOutUser: ctrlWrapper(signOutUser),
  currentUser: ctrlWrapper(currentUser),
};
