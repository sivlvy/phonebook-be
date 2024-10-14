const Contacts = require("../models/Contacts.model");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const req = require("express/lib/request");

const getContacts = async (req, res) => {
  const { id } = req.user;

  const contacts = await Contacts.findAll({ where: { user_id: id } });

  res.status(200).json(contacts);
};

const createContact = async (req, res) => {
  const { name, phone_number } = req.body;
  const { id } = req.user;

  const newContact = await Contacts.create({ name, phone_number, user_id: id });

  res.status(200).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const { id: userId } = req.user;

  const contact = await Contacts.findOne({ where: { id, user_id: userId } });

  await contact.update({ name, phone_number });

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const contact = await Contacts.findOne({
    where: {
      id,
      user_id: userId,
    },
  });

  await contact.destroy();

  res.status(204).json({ message: "Contact deleted succesfully" });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
