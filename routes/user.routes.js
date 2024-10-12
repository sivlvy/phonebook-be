const router = require("express").Router();
const userControllers = require("../controllers/user.controllers");
const validateBody = require("../middlewares/validateBody");
const { signUpSchema } = require("../schemes/user.schemes");
const authneticate = require("../middlewares/authenticate");

router.post("/signup", validateBody(signUpSchema), userControllers.signUpUser);
router.post("/login", authneticate, userControllers.signInUser);
router.post("/logout", userControllers.signOutUser);
router.get("/", userControllers.currentUser);

module.exports = router;
