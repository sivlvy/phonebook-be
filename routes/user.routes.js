const router = require("express").Router();
const userControllers = require("../controllers/user.controllers");
const validateBody = require("../middlewares/validateBody");
const { signUpSchema, signInSchema } = require("../schemes/user.schemes");
const authneticate = require("../middlewares/authenticate");

router.post("/signup", validateBody(signUpSchema), userControllers.signUpUser);
router.post(
  "/login",
  authneticate,
  validateBody(signInSchema),
  userControllers.signInUser,
);
router.post("/logout", authneticate, userControllers.signOutUser);
router.get("/current", authneticate, userControllers.currentUser);

module.exports = router;
