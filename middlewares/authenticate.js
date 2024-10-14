require("dotenv").config();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const req = require("express/lib/request");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  // Перевірка наявності заголовка authorization
  if (!authorization) {
    return next(HttpError(401, "Unauthorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Unauthorized"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);

    if (!user || !user.access_token || user.access_token !== token) {
      return next(HttpError(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
