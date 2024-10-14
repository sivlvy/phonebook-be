const router = require("express").Router();
const contactsController = require("../controllers/contacts.controllers");

const authenticate = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemes/contacts.schemes");

router.get("/contacts", authenticate, contactsController.getContacts);
router.post(
  "/contacts",
  authenticate,
  validateBody(createContactSchema),
  contactsController.createContact,
);
router.put(
  "/contacts/:id",
  authenticate,
  validateBody(updateContactSchema),
  contactsController.updateContact,
);
router.delete("/contacts/:id", authenticate, contactsController.deleteContact);

module.exports = router;
