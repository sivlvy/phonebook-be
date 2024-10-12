require("dotenv").config();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const req = require("express/lib/request");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);

    if (!user || !user.token || !user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;

    next();
  } catch {
    throw HttpError(401);
  }
};

module.exports = authenticate;
